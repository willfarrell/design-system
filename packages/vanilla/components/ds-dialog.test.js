import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const setup = async (id) => {
	const page = await open(`
		<button is="ds-button-dialog" data-dialog='${id}'>Open</button>
		<dialog is="ds-dialog" id='${id}' inert><form method="dialog"><button id="close">Close</button></form></dialog>`);
	await load(page, "components/ds-dialog.js", "components/ds-button-dialog.js");
	return page;
};

for (const id of ["dialog", 'odd"]id']) {
	test(`opening and closing a dialog (id ${id}) restores the trigger`, async () => {
		const page = await setup(id);
		await page.click("button[is=ds-button-dialog]");
		const opened = await page.evaluate(() => {
			const dialog = document.querySelector("dialog");
			return {
				modal: dialog.matches(":modal"),
				inert: dialog.inert,
				expanded: document
					.querySelector("button[is=ds-button-dialog]")
					.getAttribute("aria-expanded"),
			};
		});
		assert.deepEqual(opened, { modal: true, inert: false, expanded: "true" });
		await page.click("#close");
		await page.waitForTimeout(50);
		const closed = await page.evaluate(() => ({
			open: document.querySelector("dialog").open,
			inert: document.querySelector("dialog").inert,
			expanded: document
				.querySelector("button[is=ds-button-dialog]")
				.getAttribute("aria-expanded"),
			focused: document.activeElement.getAttribute("is"),
		}));
		assert.deepEqual(closed, {
			open: false,
			inert: true,
			expanded: "false",
			focused: "ds-button-dialog",
		});
		assert.deepEqual(page.errors, []);
	});
}

test("a dialog button without its dialog does nothing", async () => {
	const page = await open(
		`<button is="ds-button-dialog" data-dialog="missing">Open</button>`,
	);
	await load(page, "components/ds-button-dialog.js");
	await page.click("button");
	assert.deepEqual(page.errors, []);
	assert.equal(await page.getAttribute("button", "aria-expanded"), "false");
});
