import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { load, open } from "../test-browser.js";

const markup = (is) => `
	<div><button is="${is}" id="elem" data-elem="code" data-filename="a.txt"><span>Go</span></button><code>
		v=spf1 -all
	</code></div>
	<div><button is="${is}" id="literal" data-value=" literal " data-filename="b.txt"><span>Go</span></button></div>
	<div><button is="${is}" id="input" data-elem="#field" data-filename="c.txt"><span>Go</span></button></div>
	<input id="field" value="from input">
	<div><button is="${is}" id="none" data-filename="d.txt"><span>Go</span></button></div>`;

const cases = [
	["elem", "v=spf1 -all"],
	["literal", " literal "],
	["input", "from input"],
	["none", ""],
];

test("ds-copy writes the resolved value to the clipboard", async () => {
	const page = await open(markup("ds-copy"));
	await page.evaluate(() => {
		window.written = [];
		Object.defineProperty(navigator, "clipboard", {
			value: { writeText: async (text) => window.written.push(text) },
		});
	});
	await load(page, "components/ds-copy.js");
	for (const [id] of cases) await page.click(`#${id}`);
	assert.deepEqual(
		await page.evaluate(() => window.written),
		cases.map(([, value]) => value),
	);
});

test("ds-download saves the resolved value", async () => {
	const page = await open(markup("ds-download"));
	await load(page, "components/ds-download.js");
	for (const [id, value] of cases) {
		const [download] = await Promise.all([
			page.waitForEvent("download"),
			page.click(`#${id}`),
		]);
		assert.equal(await readFile(await download.path(), "utf8"), value);
	}
});
