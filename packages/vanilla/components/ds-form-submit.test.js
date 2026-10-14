import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open, vanilla } from "../browser.testutil.js";

const setup = async (form) => {
	const page = await open(`<iframe name="sink"></iframe>${form}`);
	page.posts = [];
	await page.route("http://test/save**", async (route) => {
		page.posts.push(route.request());
		await route.fulfill({ body: "saved", contentType: "text/html" });
	});
	await load(page, "components/ds-form-submit.js");
	await page.evaluate(() => {
		window.prevented = [];
		document.querySelector("form").addEventListener("submit", (event) => {
			window.prevented.push(event.defaultPrevented);
		});
	});
	return page;
};

const form = `
	<form is="ds-form-submit" method="post" action="/other" target="sink">
		<input name="title" value="hello">
		<button name="action" value="save" formaction="/save">Save</button>
		<span data-loader="false"></span>
	</form>`;

test("the first submit keeps the submitter's value and formaction", async () => {
	const page = await setup(form);
	const request = page.waitForRequest("http://test/save");
	await page.click("button");
	const sent = await request;
	assert.equal(sent.method(), "POST");
	assert.match(sent.postData(), /title=hello/);
	assert.match(sent.postData(), /action=save/);
	assert.deepEqual(await page.evaluate(() => window.prevented), [false]);
});

test("repeat submits are blocked while the first is in flight", async () => {
	const page = await setup(form);
	await page.evaluate(() => {
		const button = document.querySelector("button");
		button.click();
		button.click();
		button.click();
	});
	assert.deepEqual(await page.evaluate(() => window.prevented), [
		false,
		true,
		true,
	]);
});

test("submitting marks the form busy and shows the loader", async () => {
	const page = await setup(form);
	await page.click("button");
	assert.equal(await page.getAttribute("form", "aria-busy"), "true");
	assert.equal(await page.getAttribute("span", "data-loader"), "true");
});

test("a change-submitted form still runs validation", async () => {
	const page = await setup(`
		<form is="ds-form-submit" data-onchange="true" method="post" action="/save" target="sink">
			<input name="required" required>
			<select name="sort"><option>a</option><option>b</option></select>
			<button>Search</button>
		</form>`);
	await page.selectOption("select", "b");
	await page.waitForTimeout(100);
	assert.equal(page.posts.length, 0);
	assert.deepEqual(page.errors, []);
});

test("a valid change-submitted form submits", async () => {
	const page = await setup(`
		<form is="ds-form-submit" data-onchange="true" method="post" action="/save" target="sink">
			<select name="sort"><option>a</option><option>b</option></select>
			<button>Search</button>
		</form>`);
	const request = page.waitForRequest("http://test/save");
	await page.selectOption("select", "b");
	assert.match((await request).postData(), /sort=b/);
});

test("a change-submitted form without a submit button does not throw", async () => {
	const page = await setup(`
		<form is="ds-form-submit" data-onchange="true" method="post" action="/save" target="sink">
			<select name="sort"><option>a</option><option>b</option></select>
		</form>`);
	assert.deepEqual(page.errors, []);
});

test("the loader style only applies inside a ds-form", async () => {
	const page = await open(`
		<link rel="stylesheet" href="${vanilla}/all.css">
		<div id="outside" data-loader="false">outside</div>
		<form is="ds-form-submit"><span id="inside" data-loader="false"></span></form>`);
	const display = (id) =>
		page.$eval(`#${id}`, (el) => getComputedStyle(el).display);
	assert.equal(await display("outside"), "block");
	assert.equal(await display("inside"), "none");
});
