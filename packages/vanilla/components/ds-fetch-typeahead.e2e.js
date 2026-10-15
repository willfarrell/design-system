import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const setup = async (items, html) => {
	const page = await open(
		html ??
			`<label for="q">Search</label><input id="q" is="ds-fetch-typeahead" data-src="/search">`,
		{
			files: {
				"/search": {
					body: JSON.stringify(items),
					contentType: "application/json",
				},
				"/next": { body: "<p>next</p>", contentType: "text/html" },
			},
		},
	);
	await load(page, "components/ds-fetch-typeahead.js");
	return page;
};

const choose = async (page, selector = "input") => {
	await page.fill(selector, "a");
	await page.waitForSelector('[role="option"][data-index="0"]');
	await page.press(selector, "ArrowDown");
	await page.press(selector, "Enter");
};

test("an http(s) href from the server navigates", async () => {
	const page = await setup([{ label: "Next", href: "http://test/next" }]);
	await Promise.all([page.waitForURL("http://test/next"), choose(page)]);
	assert.equal(page.url(), "http://test/next");
});

test("a javascript: href from the server is not followed", async () => {
	const page = await setup([
		{ label: "Evil", href: "javascript:window.pwned=true" },
	]);
	await choose(page);
	await page.waitForTimeout(100);
	assert.equal(await page.evaluate(() => window.pwned), undefined);
	assert.equal(page.url(), "http://test/");
	assert.equal(await page.inputValue("input"), "Evil");
});

test("inputs without an id get distinct listbox ids", async () => {
	const page = await setup(
		[{ label: "One" }],
		`<input aria-label="a" is="ds-fetch-typeahead" data-src="/search"><input aria-label="b" is="ds-fetch-typeahead" data-src="/search">`,
	);
	const ids = await page.$$eval("input", (inputs) =>
		inputs.map((input) => input.getAttribute("aria-controls")),
	);
	assert.equal(new Set(ids).size, 2, ids.join());
	for (const id of ids) {
		assert.doesNotMatch(id, /undefined|^-/);
		assert.equal(
			await page.evaluate((key) => !!document.getElementById(key), id),
			true,
		);
	}
});
