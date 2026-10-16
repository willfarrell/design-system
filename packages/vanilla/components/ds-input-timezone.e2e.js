import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const setup = async (timezoneId) => {
	const page = await open(
		`<form><input type="hidden" is="ds-input-timezone" name="timezone" value=""></form>`,
		{ context: { timezoneId } },
	);
	await page.evaluate(() => {
		window.inputs = 0;
		document.addEventListener("input", () => {
			window.inputs += 1;
		});
	});
	await load(page, "components/ds-input-timezone.js");
	return page.evaluate(() => ({
		submitted: new FormData(document.querySelector("form")).get("timezone"),
		attribute: document.querySelector("input").getAttribute("value"),
		inputs: window.inputs,
	}));
};

for (const timezoneId of ["America/Toronto", "Europe/Paris"]) {
	test(`the browser's time zone (${timezoneId}) is submitted`, async () => {
		assert.deepEqual(await setup(timezoneId), {
			submitted: timezoneId,
			attribute: timezoneId,
			inputs: 1,
		});
	});
}
