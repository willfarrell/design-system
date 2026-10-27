import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open, vanilla } from "../browser.testutil.js";

test("the shortcut hint sits inside the end of its field", async () => {
	const page = await open(
		`<link rel="stylesheet" href="${vanilla}/all.css">
		<form><div class="group">
			<input type="search" id="q" aria-label="Search" size="18" aria-keyshortcuts="Meta+K Control+K">
			<button type="submit">Search</button>
		</div></form>`,
	);
	await load(page, "bootstrap/keyshortcuts.js");
	const { input, kbd } = await page.evaluate(() => {
		const box = (el) => el.getBoundingClientRect().toJSON();
		return {
			input: box(document.getElementById("q")),
			kbd: box(document.querySelector("#q + kbd")),
		};
	});
	assert.ok(kbd.left >= input.left && kbd.right <= input.right, "inline");
	assert.ok(kbd.top >= input.top && kbd.bottom <= input.bottom, "block");
	assert.ok(kbd.right > input.left + input.width / 2, "at the end");
});
