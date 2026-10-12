import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/popover-hint";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 2.1.1 Keyboard — hint toggles from its button", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const hint = page.locator("#popover-hint-demo");
	await expect(hint).toHaveAttribute("popover", "hint");
	await expect(hint).toBeHidden();
	await page.getByRole("button", { name: "Toggle hint" }).focus();
	await page.keyboard.press("Enter");
	await expect(hint).toBeVisible();
	await page.keyboard.press("Enter");
	await expect(hint).toBeHidden();
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
