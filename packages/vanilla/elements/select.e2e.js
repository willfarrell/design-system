import assert from "node:assert/strict";
import { test } from "node:test";
import { open, vanilla } from "../browser.testutil.js";

const html = `<link rel="stylesheet" href="${vanilla}/all.css">
	<select id="s"><option>One</option><option selected>Two</option><optgroup label="Group"><option>Three</option></optgroup></select>`;

const colours = (page, picker) =>
	page.evaluate((picker) => {
		const canvas = document.createElement("canvas");
		canvas.width = 1;
		canvas.height = 1;
		const context = canvas.getContext("2d", { willReadFrequently: true });
		const rgba = (colour) => {
			context.clearRect(0, 0, 1, 1);
			context.fillStyle = colour;
			context.fillRect(0, 0, 1, 1);
			return [...context.getImageData(0, 0, 1, 1).data];
		};
		const select = document.querySelector("#s");
		const surface = picker
			? getComputedStyle(select, "::picker(select)")
			: getComputedStyle(select.options[0]);
		return {
			body: rgba(getComputedStyle(document.body).backgroundColor),
			background: rgba(surface.backgroundColor),
			options: [...select.querySelectorAll("option, optgroup")].map((el) =>
				rgba(getComputedStyle(el).color),
			),
		};
	}, picker);

const luminance = ([r, g, b]) => {
	const [lr, lg, lb] = [r, g, b].map((channel) => {
		const value = channel / 255;
		return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
};

const contrast = (a, b) => {
	const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (high + 0.05) / (low + 0.05);
};

for (const colorScheme of ["light", "dark"]) {
	test(`the open select picker uses the page surface and options meet 4.5:1 in ${colorScheme} mode`, async () => {
		const page = await open(html, { media: { colorScheme } });
		await page.click("#s");
		assert.equal(await page.$eval("#s", (el) => el.matches(":open")), true);
		const { body, background, options } = await colours(page, true);
		assert.deepEqual(background, body);
		for (const colour of options) {
			const ratio = contrast(colour, background);
			assert.ok(ratio >= 4.5, `${colour} on ${background}: ${ratio}`);
		}
	});

	test(`forced colours give select options an opaque background that meets 4.5:1 in ${colorScheme} mode`, async () => {
		const page = await open(html, {
			media: { colorScheme, forcedColors: "active" },
		});
		const { background, options } = await colours(page, false);
		assert.equal(background[3], 255, `${background}`);
		for (const colour of options) {
			const ratio = contrast(colour, background);
			assert.ok(ratio >= 4.5, `${colour} on ${background}: ${ratio}`);
		}
	});
}
