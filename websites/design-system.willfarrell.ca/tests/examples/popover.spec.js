import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/popover";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 2.1.1 Keyboard — popover toggle button is focusable and activatable via keyboard", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const button = page.getByRole("button", { name: "Toggle popover" });
	await button.focus();
	await expect(button).toBeFocused();
	await page.keyboard.press("Enter");
	const popover = page.locator("#popover-demo");
	await expect(popover).toBeVisible();
	await page.keyboard.press("Enter");
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — toggle button has accessible name", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const button = page.getByRole("button", { name: "Toggle popover" });
	await expect(button).toBeVisible();
	const text = await button.textContent();
	expect(text.trim().length).toBeGreaterThan(0);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
