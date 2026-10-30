import assert from "node:assert/strict";
import { test } from "node:test";
import { open, vanilla } from "../browser.testutil.js";

const setup = (style) =>
	open(`<link rel="stylesheet" href="${vanilla}/all.css">
		<button id="opener" popovertarget="pop" style="position:absolute;${style}">Toggle</button>
		<div id="pop" popover="auto"><p>Popover content</p></div>`);

const boxes = (page) =>
	page.evaluate(() => {
		const rect = (id) => document.getElementById(id).getBoundingClientRect();
		return { opener: rect("opener").toJSON(), popover: rect("pop").toJSON() };
	});

test("a popover opens above its opener", async () => {
	const page = await setup("top:300px;left:300px");
	await page.click("#opener");
	const { opener, popover } = await boxes(page);
	assert.ok(popover.bottom <= opener.top, `${popover.bottom} <= ${opener.top}`);
	const center = (box) => box.left + box.width / 2;
	assert.ok(Math.abs(center(popover) - center(opener)) < 2);
});

test("a popover flips below an opener at the top edge", async () => {
	const page = await setup("top:4px;left:300px");
	await page.click("#opener");
	const { opener, popover } = await boxes(page);
	assert.ok(popover.top >= opener.bottom, `${popover.top} >= ${opener.bottom}`);
});

test("a popover stays inside the viewport for an opener at the inline edge", async () => {
	const page = await setup("top:300px;left:4px");
	await page.click("#opener");
	const { opener, popover } = await boxes(page);
	assert.ok(popover.left >= 0);
	assert.ok(popover.bottom <= opener.top);
});

test("the connector points at the side of the opener", async () => {
	const page = await setup("top:4px;left:300px");
	await page.click("#opener");
	const arrow = await page.evaluate(() => {
		const style = getComputedStyle(document.getElementById("pop"), "::before");
		return {
			size: Number.parseFloat(style.minBlockSize),
			side: style.alignSelf,
		};
	});
	assert.ok(arrow.size > 0);
	assert.equal(arrow.side, "self-start");
});

test("a popover without an anchor opens inside the viewport without a connector", async () => {
	const page = await open(`<link rel="stylesheet" href="${vanilla}/all.css">
		<div id="pop" popover="auto"><p>Popover content</p></div>`);
	await page.evaluate(() => document.getElementById("pop").showPopover());
	const { box, arrow } = await page.evaluate(() => {
		const el = document.getElementById("pop");
		return {
			box: el.getBoundingClientRect().toJSON(),
			arrow: getComputedStyle(el, "::before").minBlockSize,
		};
	});
	assert.ok(box.top >= 0 && box.left >= 0);
	assert.equal(arrow, "0px");
});
