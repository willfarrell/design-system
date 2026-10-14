import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const setup = async (lang) => {
	const page = await open(
		`<pre><code is="ds-codeblock-highlight" data-lang='${lang}'>a { color: red }</code></pre>`,
		{
			files: {
				"/js/pewc/ds-codeblock-highlight-css.js": `
					globalThis.Prism.languages.css = { property: /color/ };
				`,
			},
		},
	);
	page.requested = [];
	page.on("request", (request) => page.requested.push(request.url()));
	await page.evaluate(() => {
		window.addEventListener("unhandledrejection", (event) => {
			window.rejections = (window.rejections ?? 0) + 1;
			event.preventDefault();
		});
	});
	await load(page, "components/ds-codeblock-highlight.js");
	await page.waitForTimeout(100);
	return page;
};

test("a valid language loads its grammar", async () => {
	const page = await setup("css");
	assert.ok(
		page.requested.some((url) =>
			url.endsWith("/js/pewc/ds-codeblock-highlight-css.js"),
		),
	);
	assert.deepEqual(page.errors, []);
});

for (const lang of ["../../evil", 'css"],x', "Css"]) {
	test(`an invalid language (${lang}) is left as plain text`, async () => {
		const page = await setup(lang);
		assert.deepEqual(
			page.requested.filter(
				(url) => url.includes("evil") || url.includes("/js/pewc/"),
			),
			[],
		);
		assert.equal(await page.evaluate(() => window.rejections), undefined);
		assert.equal(await page.textContent("code"), "a { color: red }");
		assert.equal(await page.$$eval("code span", (spans) => spans.length), 0);
	});
}
