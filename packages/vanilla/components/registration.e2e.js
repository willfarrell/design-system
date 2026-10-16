import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { test } from "node:test";
import { open, vanilla } from "../browser.testutil.js";

const modules = (await readdir(new URL(".", import.meta.url))).filter(
	(file) =>
		file.startsWith("ds-") &&
		file.endsWith(".js") &&
		!file.endsWith(".test.js") &&
		!file.endsWith(".e2e.js"),
);

test("every component survives being evaluated twice", async () => {
	const page = await open("");
	const failures = await page.evaluate(
		async (urls) => {
			const failed = [];
			for (const url of urls) {
				try {
					await import(url);
					await import(`${url}?again`);
				} catch (error) {
					failed.push(`${url}: ${error.message}`);
				}
			}
			return failed;
		},
		modules.map((file) => `${vanilla}/components/${file}`),
	);
	assert.deepEqual(failures, []);
	assert.deepEqual(page.errors, []);
});
