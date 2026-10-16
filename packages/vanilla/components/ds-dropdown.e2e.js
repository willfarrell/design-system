import assert from "node:assert/strict";
import { test } from "node:test";
import { open, vanilla } from "../browser.testutil.js";

const dropdown = (id) => `
	<li>
		<button id="${id}-button" popovertarget="${id}">${id}</button>
		<div id="${id}" popover class="ds-dropdown"><a href="#">${id} link</a></div>
	</li>`;

test("each dropdown anchors to its own button", async () => {
	const page = await open(`
		<link rel="stylesheet" href="${vanilla}/all.css">
		<ul style="display:flex;gap:20rem;list-style:none">
			${dropdown("first")}
			${dropdown("second")}
		</ul>`);
	for (const id of ["first", "second"]) {
		await page.click(`#${id}-button`);
		const { button, popover } = await page.evaluate((key) => {
			const rect = (el) => el.getBoundingClientRect().toJSON();
			return {
				button: rect(document.getElementById(`${key}-button`)),
				popover: rect(document.getElementById(key)),
			};
		}, id);
		assert.ok(
			Math.abs(popover.left - button.left) < 2,
			`${id}: popover ${popover.left} vs button ${button.left}`,
		);
		assert.ok(popover.top >= button.bottom, `${id} below its button`);
		await page.keyboard.press("Escape");
	}
});

test("dropdowns sharing a parent each anchor to their own button", async () => {
	const wrapped = (id) => `
		<div>
			<button id="${id}-button" popovertarget="${id}">${id}</button>
			<div id="${id}" popover class="ds-dropdown"><a href="#">${id} link</a></div>
		</div>`;
	const page = await open(`
		<link rel="stylesheet" href="${vanilla}/all.css">
		<nav style="display:flex;gap:20rem">
			${wrapped("first")}
			${wrapped("second")}
		</nav>`);
	for (const id of ["first", "second"]) {
		await page.click(`#${id}-button`);
		const { button, popover } = await page.evaluate((key) => {
			const rect = (el) => el.getBoundingClientRect().toJSON();
			return {
				button: rect(document.getElementById(`${key}-button`)),
				popover: rect(document.getElementById(key)),
			};
		}, id);
		assert.ok(
			Math.abs(popover.left - button.left) < 2,
			`${id}: popover ${popover.left} vs button ${button.left}`,
		);
		assert.ok(popover.top >= button.bottom, `${id} below its button`);
		await page.keyboard.press("Escape");
	}
});
