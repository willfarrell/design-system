import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const setup = async () => {
	const page = await open(
		`<input id="search" aria-keyshortcuts="Meta+K Control+K"><input id="other"><a id="top" href="#top" aria-keyshortcuts="Shift+T">Top</a>`,
	);
	await load(page, "bootstrap/keyshortcuts.js");
	return page;
};

test("a shortcut focuses its field", async () => {
	const page = await setup();
	await page.keyboard.press("Control+K");
	assert.equal(await page.evaluate(() => document.activeElement.id), "search");
});

test("a shortcut clicks a non-field element", async () => {
	const page = await setup();
	await page.keyboard.press("Shift+T");
	assert.equal(await page.evaluate(() => location.hash), "#top");
});

test("a modifier shortcut works while typing in another field", async () => {
	const page = await setup();
	await page.focus("#other");
	await page.keyboard.press("Control+K");
	assert.equal(await page.evaluate(() => document.activeElement.id), "search");
});

test("a shortcut without Control, Meta or Alt is ignored while typing", async () => {
	const page = await setup();
	await page.focus("#other");
	await page.keyboard.press("Shift+T");
	assert.equal(await page.evaluate(() => location.hash), "");
});

test("the shortcut is shown once loaded and hidden from assistive tech", async () => {
	const page = await setup();
	const hints = await page.evaluate(() =>
		[...document.querySelectorAll("kbd")].map((kbd) => [
			kbd.previousElementSibling?.id ?? kbd.parentElement.id,
			kbd.textContent,
			kbd.getAttribute("aria-hidden"),
		]),
	);
	const apple = await page.evaluate(() =>
		/Mac|iPod|iPhone|iPad/.test(navigator.platform),
	);
	assert.deepEqual(hints, [
		["search", apple ? "⌘\u2009K" : "Ctrl+K", "true"],
		["top", apple ? "⇧T" : "Shift+T", "true"],
	]);
});
