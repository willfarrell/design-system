import assert from "node:assert/strict";
import { test } from "node:test";
import { open, vanilla } from "../browser.testutil.js";

const setup = () =>
	open(`<link rel="stylesheet" href="${vanilla}/all.css">
		<button id="show" commandfor="d" command="show-modal">Open</button>
		<dialog id="d" closedby="any" aria-labelledby="h"><form method="dialog"><h2 id="h">Title</h2><button id="close" type="button" commandfor="d" command="close">Close</button></form></dialog>`);

const state = (page) =>
	page.evaluate(() => ({
		modal: document.querySelector("dialog").matches(":modal"),
		focused: document.activeElement.id,
	}));

test("an invoker button opens the dialog modally and a close command restores focus", async () => {
	const page = await setup();
	await page.click("#show");
	assert.equal((await state(page)).modal, true);
	await page.click("#close");
	assert.deepEqual(await state(page), { modal: false, focused: "show" });
});

test("escape closes the dialog", async () => {
	const page = await setup();
	await page.click("#show");
	await page.keyboard.press("Escape");
	assert.deepEqual(await state(page), { modal: false, focused: "show" });
});

for (const [where, point] of [
	["the backdrop", () => ({ x: 2, y: 2 })],
	[
		"the dimmed area beside the dialog",
		() => {
			const box = document.querySelector("dialog").getBoundingClientRect();
			return { x: box.left - 10, y: box.top + box.height / 2 };
		},
	],
]) {
	test(`clicking ${where} closes the dialog`, async () => {
		const page = await setup();
		await page.click("#show");
		const { x, y } = await page.evaluate(point);
		await page.mouse.click(x, y);
		assert.deepEqual(await state(page), { modal: false, focused: "show" });
	});
}

test("clicking inside the dialog content keeps it open", async () => {
	const page = await setup();
	await page.click("#show");
	await page.click("#h");
	assert.equal((await state(page)).modal, true);
});

test("footer content is spaced from its buttons and loose content is inset", async () => {
	const page = await open(`<link rel="stylesheet" href="${vanilla}/all.css">
		<button id="show" commandfor="d" command="show-modal">Open</button>
		<dialog id="d" aria-labelledby="h"><form method="dialog"><header><h2 id="h">Title</h2></header><p id="p">Body</p><footer><span id="text">Dialog footer</span><button id="close" commandfor="d" command="close">Close</button></footer></form></dialog>`);
	await page.click("#show");
	const box = (id) =>
		page.evaluate(
			(id) => document.getElementById(id).getBoundingClientRect().toJSON(),
			id,
		);
	const [text, close, p, dialog] = await Promise.all(
		["text", "close", "p", "d"].map(box),
	);
	assert.ok(close.left - text.right >= 8);
	assert.ok(p.left - dialog.left >= 8);
});
