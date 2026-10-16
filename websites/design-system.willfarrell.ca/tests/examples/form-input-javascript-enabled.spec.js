import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-javascript-enabled";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("the component sets the value to true", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expect(
		page.locator('input[is="ds-input-javascript-enabled"]'),
	).toHaveValue("true");
});

test("without JavaScript the value stays false", async ({ browser }) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	const page = await context.newPage();
	await page.goto(path);
	await expect(
		page.locator('input[is="ds-input-javascript-enabled"]'),
	).toHaveValue("false");
	await context.close();
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
