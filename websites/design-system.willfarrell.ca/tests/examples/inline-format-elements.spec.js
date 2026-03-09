import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/inline-format-elements";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — semantic elements (abbr, code, kbd, etc.) present", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const semanticElements = page.locator(
		"abbr, code, kbd, samp, var, pre, q, cite, dfn, time",
	);
	const count = await semanticElements.count();
	expect(count).toBeGreaterThan(0);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
