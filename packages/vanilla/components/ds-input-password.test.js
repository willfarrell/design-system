import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const setup = async (attributes = "") => {
	const page = await open(
		`<label for="pw">Password</label><input id="pw" type="password" is="ds-input-password" ${attributes}>`,
	);
	await load(page, "components/ds-input-password.js");
	return page;
};

test("a toggle button shows and hides the password", async () => {
	const page = await setup();
	const toggle = page.getByRole("button", { name: "Show" });
	assert.equal(await toggle.getAttribute("aria-pressed"), "false");
	assert.equal(await toggle.getAttribute("aria-controls"), "pw");
	await toggle.click();
	assert.equal(await page.getAttribute("#pw", "type"), "text");
	assert.equal(await toggle.getAttribute("aria-pressed"), "true");
	await toggle.click();
	assert.equal(await page.getAttribute("#pw", "type"), "password");
	assert.equal(await toggle.getAttribute("aria-pressed"), "false");
});

test("the toggle does not submit its form", async () => {
	const page = await open(
		`<form action="/next"><label for="pw">Password</label><input id="pw" type="password" is="ds-input-password"></form>`,
	);
	await load(page, "components/ds-input-password.js");
	await page.getByRole("button", { name: "Show" }).click();
	assert.equal(await page.evaluate(() => location.pathname), "/");
});

test("the toggle label is translatable", async () => {
	const page = await setup('data-i18n-show="Afficher"');
	assert.equal(await page.getByRole("button", { name: "Afficher" }).count(), 1);
});

test("removing the input removes its toggle", async () => {
	const page = await setup();
	await page.evaluate(() => document.getElementById("pw").remove());
	assert.equal(await page.locator("button").count(), 0);
});

const key = (page, type, capsLock) =>
	page.$eval(
		"#pw",
		(el, [type, capsLock]) =>
			el.dispatchEvent(
				new KeyboardEvent(type, {
					key: "a",
					bubbles: true,
					modifierCapsLock: capsLock,
				}),
			),
		[type, capsLock],
	);

const capslock = (page) =>
	page.evaluate(() => {
		const input = document.getElementById("pw");
		const status = document.querySelector("[role=status]");
		return {
			describedby: input.getAttribute("aria-describedby"),
			id: status?.id,
			text: status?.textContent,
			icons: [...(status?.querySelectorAll("svg") ?? [])].map((svg) => [
				svg.getAttribute("aria-hidden"),
				svg.querySelector("use").getAttribute("href"),
			]),
		};
	});

test("an empty caps lock status describes the input before any key", async () => {
	const page = await setup();
	const { describedby, id, text, icons } = await capslock(page);
	assert.ok(id);
	assert.equal(describedby, id);
	assert.equal(text, "");
	assert.deepEqual(icons, []);
});

test("caps lock on shows the message with an icon, off clears it", async () => {
	const page = await setup();
	await page.focus("#pw");
	await key(page, "keydown", true);
	const on = await capslock(page);
	assert.equal(on.text, "Caps Lock is on");
	assert.deepEqual(on.icons, [["true", "/img/icons.svg#capslock"]]);
	await key(page, "keyup", false);
	const off = await capslock(page);
	assert.equal(off.text, "");
	assert.deepEqual(off.icons, []);
});

test("leaving the field clears the caps lock message", async () => {
	const page = await setup();
	await page.focus("#pw");
	await key(page, "keyup", true);
	await page.$eval("#pw", (el) => el.blur());
	assert.equal((await capslock(page)).text, "");
});

test("existing descriptions are kept alongside the caps lock status", async () => {
	const page = await setup('aria-describedby="pw-hint"');
	const { describedby, id } = await capslock(page);
	assert.equal(describedby, `pw-hint ${id}`);
});

test("the caps lock message and icon sprite are configurable", async () => {
	const page = await setup(
		'data-i18n-capslock="Verr Maj" data-icon="/assets/sprite.svg#anything"',
	);
	await key(page, "keydown", true);
	const { text, icons } = await capslock(page);
	assert.equal(text, "Verr Maj");
	assert.deepEqual(icons, [["true", "/assets/sprite.svg#capslock"]]);
});

test("removing the input removes the caps lock status and its listeners", async () => {
	const page = await setup('aria-describedby="pw-hint"');
	const result = await page.evaluate(() => {
		const input = document.getElementById("pw");
		input.remove();
		input.dispatchEvent(
			new KeyboardEvent("keydown", { key: "a", modifierCapsLock: true }),
		);
		return {
			status: document.querySelectorAll("[role=status]").length,
			describedby: input.getAttribute("aria-describedby"),
		};
	});
	assert.deepEqual(result, { status: 0, describedby: "pw-hint" });
});

test("the caps lock message sits beside the toggle with its icon inline", async () => {
	const page = await open(
		`<link rel="stylesheet" href="/packages/vanilla/all.css"><label for="pw">Password</label><input id="pw" type="password" is="ds-input-password">`,
	);
	await load(page, "components/ds-input-password.js");
	await key(page, "keydown", true);
	const style = await page.$eval("[role=status]", (el) => {
		const { display, alignItems, marginInlineStart } = getComputedStyle(el);
		return { display, alignItems, marginInlineStart };
	});
	assert.deepEqual(style, {
		display: "inline-flex",
		alignItems: "center",
		marginInlineStart: "9px",
	});
});
