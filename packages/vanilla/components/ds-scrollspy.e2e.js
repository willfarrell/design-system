import assert from "node:assert/strict";
import { test } from "node:test";
import { open, vanilla } from "../browser.testutil.js";

const settle = (page) =>
	page.evaluate(
		() =>
			new Promise((resolve) =>
				requestAnimationFrame(() =>
					requestAnimationFrame(() => setTimeout(resolve, 50)),
				),
			),
	);

const setup = async (links, height = "200vh") => {
	const page = await open(`
		<nav is="ds-scrollspy" id="spy"><ol>${links
			.map((id) => `<li><a id="link-${id}" href="#${id}">${id}</a></li>`)
			.join("")}</ol></nav>
		<section style="height:${height}"><h2 id="one">One</h2></section>
		<section style="height:${height}"><h2 id="two">Two</h2></section>`);
	await page.evaluate(async (url) => {
		CSS.supports = () => false;
		await import(url);
	}, `${vanilla}/components/ds-scrollspy.js`);
	await settle(page);
	return page;
};

const current = (page, id) =>
	page.evaluate(
		(key) =>
			(window.spy ?? document)
				.querySelector(`#link-${key}`)
				.getAttribute("aria-current"),
		id,
	);

test("a link to a missing target is skipped", async () => {
	const page = await setup(["missing", "one", "two"]);
	assert.deepEqual(page.errors, []);
	assert.equal(await current(page, "one"), "location");
});

test("only the first section in view is marked current", async () => {
	const page = await setup(["one", "two"], "5vh");
	assert.equal(await current(page, "one"), "location");
	assert.equal(await current(page, "two"), null);
});

test("after removal, hash changes no longer update the links", async () => {
	const page = await setup(["one", "two"]);
	await page.evaluate(async () => {
		window.spy = document.getElementById("spy");
		window.spy.remove();
		const changed = new Promise((resolve) =>
			window.addEventListener("hashchange", resolve, { once: true }),
		);
		location.hash = "#two";
		await changed;
	});
	assert.equal(await current(page, "two"), null);
});

test("after removal, scrolling no longer updates the links", async () => {
	const page = await setup(["one", "two"]);
	await page.evaluate(() => {
		window.spy = document.getElementById("spy");
		window.spy.remove();
		for (const link of window.spy.querySelectorAll("a")) {
			link.removeAttribute("aria-current");
		}
		document.getElementById("two").scrollIntoView();
	});
	await settle(page);
	assert.equal(await current(page, "two"), null);
	assert.deepEqual(page.errors, []);
});
