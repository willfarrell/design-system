import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-timezone";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("the component fills the browser timezone", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const timezone = await page.evaluate(
		() => Intl.DateTimeFormat().resolvedOptions().timeZone,
	);
	await expect(page.locator('input[is="ds-input-timezone"]')).toHaveValue(
		timezone,
	);
});

test("without JavaScript the field posts empty", async ({ browser }) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	const page = await context.newPage();
	await page.goto(path);
	await expect(page.locator('input[is="ds-input-timezone"]')).toHaveValue("");
	await context.close();
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
