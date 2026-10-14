import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { load, open, vanilla } from "../browser.testutil.js";

const preloads = ["ds-codeblock-actions", "ds-copy", "ds-download"]
	.map(
		(name) =>
			`<link rel="modulepreload" href="${vanilla}/components/${name}.js">`,
	)
	.join("");

const setup = async (attributes = "") => {
	const page = await open(
		`${preloads}<pre is="ds-codeblock-actions" ${attributes}><code>v=spf1 -all</code></pre>`,
	);
	await page.evaluate(() => {
		window.written = [];
		Object.defineProperty(navigator, "clipboard", {
			value: { writeText: async (text) => window.written.push(text) },
		});
	});
	await load(page, "bootstrap/webcomponents.js");
	await page.waitForFunction(
		() =>
			customElements.get("ds-codeblock-actions") &&
			[...document.querySelectorAll("[is]")].every((el) =>
				customElements.get(el.getAttribute("is")),
			),
	);
	return page;
};

test("the copy button copies the code block", async () => {
	const page = await setup();
	await page.getByRole("button", { name: "Copy" }).click();
	assert.deepEqual(await page.evaluate(() => window.written), ["v=spf1 -all"]);
});

test("the download button saves the code block under its filename", async () => {
	const page = await setup('data-filename="spf.txt"');
	const [download] = await Promise.all([
		page.waitForEvent("download"),
		page.getByRole("button", { name: "Download" }).click(),
	]);
	assert.equal(download.suggestedFilename(), "spf.txt");
	assert.equal(await readFile(await download.path(), "utf8"), "v=spf1 -all");
});

test("no download button without a filename", async () => {
	const page = await setup();
	assert.equal(await page.getByRole("button", { name: "Download" }).count(), 0);
});

test("i18n labels name the buttons", async () => {
	const page = await setup(
		'data-filename="" data-i18n-copy="Copier" data-i18n-download="Enregistrer"',
	);
	assert.equal(await page.getByRole("button", { name: "Copier" }).count(), 1);
	assert.equal(
		await page.getByRole("button", { name: "Enregistrer" }).count(),
		1,
	);
});

test("the buttons are removed when the block is disconnected", async () => {
	const page = await setup('data-filename=""');
	const count = await page.evaluate(() => {
		const pre = document.querySelector("pre");
		pre.remove();
		return pre.querySelectorAll("button").length;
	});
	assert.equal(count, 0);
});
