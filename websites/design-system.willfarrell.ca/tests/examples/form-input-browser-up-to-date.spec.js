import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-browser-up-to-date";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("a current browser posts true", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const input = page.locator('input[is="ds-input-browser-up-to-date"]');
	await expect(input).toHaveAttribute("type", "hidden");
	await expect(input).toHaveValue("true");
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
