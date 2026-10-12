import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { open, vanilla } from "./test-browser.js";

const stylesheet = `<link rel="stylesheet" href="${vanilla}/all.css">`;

const computed = (page, selector, property) =>
	page.$eval(
		selector,
		(el, prop) => getComputedStyle(el).getPropertyValue(prop),
		property,
	);

test("prefers-reduced-motion removes the tooltip transition", async () => {
	const page = await open(`${stylesheet}<span class="ds-tooltip">tip</span>`, {
		media: { reducedMotion: "reduce" },
	});
	const durations = (await computed(page, ".ds-tooltip", "transition-duration"))
		.split(",")
		.map((value) => Number.parseFloat(value));
	for (const duration of durations) assert.ok(duration < 0.001, `${duration}`);
});

test("prefers-reduced-motion stops the form submit spinner", async () => {
	const page = await open(
		`${stylesheet}<form is="ds-form-submit"><span data-loader="true"></span></form>`,
		{ media: { reducedMotion: "reduce" } },
	);
	const iterations = await computed(
		page,
		"[data-loader]",
		"animation-iteration-count",
	);
	assert.equal(iterations, "1");
});

test("motion runs without a reduced-motion preference", async () => {
	const page = await open(
		`${stylesheet}<span class="ds-tooltip">tip</span><form is="ds-form-submit"><span data-loader="true"></span></form>`,
		{ media: { reducedMotion: "no-preference" } },
	);
	assert.equal(
		Number.parseFloat(
			await computed(page, ".ds-tooltip", "transition-duration"),
		),
		0.15,
	);
	assert.equal(
		await computed(page, "[data-loader]", "animation-iteration-count"),
		"infinite",
	);
});

test("prefers-contrast: more widens the border", async () => {
	const page = await open(stylesheet, { media: { contrast: "more" } });
	assert.equal(
		(await computed(page, "html", "--border-width")).trim(),
		"0.1875rem",
	);
});

test("default border width without a contrast preference", async () => {
	const page = await open(stylesheet, { media: { contrast: "no-preference" } });
	assert.equal(
		(await computed(page, "html", "--border-width")).trim(),
		"0.125rem",
	);
});

for (const colorScheme of ["light", "dark"]) {
	test(`color-scheme ${colorScheme} selects the matching palette`, async () => {
		const page = await open(stylesheet, { media: { colorScheme } });
		const { background, palette } = await page.evaluate(() => {
			const style = getComputedStyle(document.body);
			return {
				background: style.backgroundColor,
				palette: getComputedStyle(document.documentElement).fontPalette,
			};
		});
		assert.equal(palette, colorScheme);
		const lightness = Number.parseFloat(background.match(/oklch\(([\d.]+)/)[1]);
		if (colorScheme === "light") assert.ok(lightness > 0.9, background);
		else assert.ok(lightness < 0.3, background);
	});
}

test("a default main colour gives the focus ring a colour", async () => {
	const page = await open(`${stylesheet}<a href="#x">link</a>`);
	await page.keyboard.press("Tab");
	const outline = await computed(page, "a", "outline-color");
	assert.match(outline, /oklch|rgb/);
	assert.notEqual(
		(await computed(page, "html", "--hex-main")).trim(),
		"",
		"--hex-main",
	);
});

test("date inputs get their element styles", async () => {
	const page = await open(`${stylesheet}<input type="date">`);
	assert.equal(await computed(page, "input", "max-inline-size"), "100%");
	const selectors = await page.evaluate(() => {
		const found = [];
		const walk = (rules) => {
			for (const rule of rules) {
				if (rule.styleSheet) walk(rule.styleSheet.cssRules);
				else if (rule.cssRules) walk(rule.cssRules);
				if (rule.selectorText) found.push(rule.selectorText);
			}
		};
		for (const sheet of document.styleSheets) walk(sheet.cssRules);
		return found;
	});
	assert.ok(
		selectors.includes('input[type="date"]::-webkit-calendar-picker-indicator'),
	);
});

test("design tokens match the rendered font weights", async () => {
	const tokens = JSON.parse(
		await readFile(new URL("./index.tokens.json", import.meta.url), "utf8"),
	);
	const page = await open(`${stylesheet}<h1>Heading</h1><p>Body</p>`);
	assert.equal(
		Number(await computed(page, "p", "font-weight")),
		tokens.typography.$value.fontWeight,
	);
	assert.equal(
		Number(await computed(page, "h1", "font-weight")),
		tokens.headingTypography.$value.fontWeight,
	);
});

test("colour scheme preferences load from prefers-color-scheme files", async () => {
	const page = await open(stylesheet);
	const hrefs = await page.evaluate(() => {
		const found = [];
		const walk = (sheet) => {
			found.push(sheet.href);
			for (const rule of sheet.cssRules) {
				if (rule.styleSheet) walk(rule.styleSheet);
			}
		};
		for (const sheet of document.styleSheets) walk(sheet);
		return found;
	});
	for (const scheme of ["light", "dark"]) {
		assert.ok(
			hrefs.some((href) =>
				href.endsWith(`/media/prefers-color-scheme-${scheme}.css`),
			),
			scheme,
		);
	}
	assert.ok(!hrefs.some((href) => href.includes("color-schema")));
});

test("table body and footer rows keep their dividers", async () => {
	const page = await open(
		`${stylesheet}<table><thead><tr><th>h</th></tr></thead><tbody><tr><td>1</td></tr><tr><td id="second">2</td></tr></tbody><tfoot><tr><td id="foot">f</td></tr></tfoot></table>`,
	);
	assert.equal(await computed(page, "#second", "border-top-style"), "solid");
	assert.equal(await computed(page, "#foot", "border-top-style"), "solid");
	assert.equal(await computed(page, "th", "border-bottom-style"), "solid");
});
