import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open, vanilla } from "../test-browser.js";

const setup = async (body) => {
	const page = await open(
		`<link rel="stylesheet" href="${vanilla}/all.css">${body}`,
	);
	await load(page, "bootstrap/tooltip.js");
	return page;
};

const tip = (page) =>
	page.evaluate(() => {
		const el = document.querySelector(".ds-tooltip");
		const arrow = document.querySelector(".ds-tooltip-arrow");
		const bridge = getComputedStyle(el, "::before");
		const rect = el.getBoundingClientRect();
		return {
			text: el.textContent,
			open: el.matches(":popover-open"),
			arrowOpen: arrow.matches(":popover-open"),
			top: rect.top,
			bridgeTop: Number.parseFloat(bridge.top),
			bridgeBottom: Number.parseFloat(bridge.bottom),
			arrowBorderTop: getComputedStyle(arrow).borderTopStyle,
		};
	});

test("the tooltip opens when a component inserts a sibling after its anchor", async () => {
	const page = await setup(
		`<div style="padding-top:50vh"><label for="pw">Password</label><input id="pw" type="password" is="ds-input-password" title="At least 12 characters"></div>`,
	);
	await load(page, "components/ds-input-password.js");
	await page.focus("#pw");
	assert.deepEqual(page.errors, []);
	const state = await tip(page);
	assert.equal(state.text, "At least 12 characters");
	assert.equal(state.open, true);
	assert.equal(state.arrowOpen, true);
	await page.keyboard.press("Escape");
	assert.equal((await tip(page)).open, false);
	assert.equal(
		await page.getAttribute("#pw", "title"),
		"At least 12 characters",
	);
});

test("the hover bridge sits below a tooltip placed above its anchor", async () => {
	const page = await setup(
		`<p style="padding-top:50vh"><abbr id="a" title="HyperText Markup Language">HTML</abbr></p>`,
	);
	await page.hover("#a");
	const state = await tip(page);
	const anchor = await page.$eval("#a", (el) => el.getBoundingClientRect().top);
	assert.ok(state.top < anchor);
	assert.ok(state.bridgeBottom < 0, `bottom ${state.bridgeBottom}`);
});

test("the hover bridge flips above a tooltip placed below its anchor", async () => {
	const page = await setup(
		`<p style="margin:0"><abbr id="a" title="HyperText Markup Language">HTML</abbr></p>`,
	);
	await page.hover("#a");
	const state = await tip(page);
	const anchor = await page.$eval("#a", (el) => el.getBoundingClientRect().top);
	assert.ok(state.top > anchor, "tooltip below");
	assert.ok(state.bridgeTop < 0, `top ${state.bridgeTop}`);
	assert.equal(state.arrowBorderTop, "solid");
});

test("the tooltip leaves its anchor's siblings alone", async () => {
	const page = await setup(
		`<input id="c" type="checkbox" title="Pick me"><label for="c">Label</label>`,
	);
	assert.equal(
		await page.$eval("#c", (el) => el.nextElementSibling.localName),
		"label",
	);
	await page.focus("#c");
	const state = await tip(page);
	assert.equal(state.open, true);
	assert.equal(state.arrowOpen, true);
});
