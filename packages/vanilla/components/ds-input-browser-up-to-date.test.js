import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const chrome = (version) =>
	`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version}.0.0.0 Safari/537.36`;
const edge = (version) => `${chrome(155)} Edg/${version}.0.0.0`;
const firefox = (version) =>
	`Mozilla/5.0 (Macintosh; Intel Mac OS X 15.0; rv:${version}.0) Gecko/20100101 Firefox/${version}.0`;
const safari = (version) =>
	`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${version} Safari/605.1.15`;

const upToDate = async (userAgent) => {
	const page = await open(
		`<input type="hidden" is="ds-input-browser-up-to-date" name="browser" value="true">`,
		{ context: { userAgent } },
	);
	await page.evaluate(() => {
		window.inputs = 0;
		document.addEventListener("input", () => {
			window.inputs += 1;
		});
	});
	await load(page, "components/ds-input-browser-up-to-date.js");
	assert.deepEqual(page.errors, []);
	const { value, attribute, inputs } = await page.$eval("input", (el) => ({
		value: el.value,
		attribute: el.getAttribute("value"),
		inputs: window.inputs,
	}));
	assert.equal(attribute, value);
	assert.equal(inputs, value === "false" ? 1 : 0);
	return value;
};

for (const [name, current, outdated] of [
	["Chrome", chrome(155), chrome(154)],
	["Edge", edge(155), edge(154)],
	["Firefox", firefox(158), firefox(157)],
	["Safari", safari("27.0"), safari("26.4")],
]) {
	test(`${name} at the October 2026 release is up to date`, async () => {
		assert.equal(await upToDate(current), "true");
	});

	test(`${name} before the October 2026 release is out of date`, async () => {
		assert.equal(await upToDate(outdated), "false");
	});
}

test("an unrecognised browser is left alone", async () => {
	assert.equal(await upToDate("curl/8.0"), "true");
});
