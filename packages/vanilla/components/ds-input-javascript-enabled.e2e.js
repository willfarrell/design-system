import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

test("the hidden input reports JavaScript as enabled", async () => {
	const page = await open(
		`<form><input type="hidden" is="ds-input-javascript-enabled" name="js" value="false"></form>`,
	);
	await page.evaluate(() => {
		window.inputs = 0;
		document.addEventListener("input", () => {
			window.inputs += 1;
		});
	});
	await load(page, "components/ds-input-javascript-enabled.js");
	assert.deepEqual(
		await page.evaluate(() => ({
			submitted: new FormData(document.querySelector("form")).get("js"),
			attribute: document.querySelector("input").getAttribute("value"),
			inputs: window.inputs,
		})),
		{ submitted: "true", attribute: "true", inputs: 1 },
	);
});

test("without the component the input keeps its server value", async () => {
	const page = await open(
		`<form><input type="hidden" is="ds-input-javascript-enabled" name="js" value="false"></form>`,
	);
	assert.equal(
		await page.evaluate(() =>
			new FormData(document.querySelector("form")).get("js"),
		),
		"false",
	);
});
