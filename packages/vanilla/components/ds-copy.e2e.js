import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

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

const announcement = async (clipboard) => {
	const page = await open(
		`<button is="ds-copy" data-value="x"><span>Copy</span></button>`,
	);
	await page.clock.install();
	await page.evaluate((ok) => {
		Object.defineProperty(navigator, "clipboard", {
			value: {
				writeText: async () => {
					if (!ok) throw new Error("denied");
				},
			},
		});
	}, clipboard);
	await load(page, "components/ds-copy.js");
	await page.click("button");
	const state = () =>
		page.evaluate(() => ({
			label: document.querySelector("button span").textContent,
			live: document.querySelector("button span").getAttribute("aria-live"),
			status: document.querySelector("[role=status]")?.textContent,
		}));
	const during = await state();
	await page.clock.runFor(2500);
	return { during, after: await state() };
};

test("ds-copy announces success but not the revert to the idle label", async () => {
	const { during, after } = await announcement(true);
	assert.deepEqual(during, { label: "Copied", live: null, status: "Copied" });
	assert.deepEqual(after, { label: "Copy", live: null, status: "" });
});

test("ds-copy announces failure", async () => {
	const { during } = await announcement(false);
	assert.deepEqual(during, {
		label: "Copy failed",
		live: null,
		status: "Copy failed",
	});
});
