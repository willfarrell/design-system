import { expect, test } from "@playwright/test";
import { expectNoAxeViolations } from "../a11y.js";

test("WCAG 2.2 Level AAA — automated axe audit (nav)", async ({ page }) => {
	await page.goto("/demo/dropdown-nav");
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 Level AAA — automated axe audit (item list)", async ({
	page,
}) => {
	await page.goto("/demo/dropdown-item-list");
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 2.1.1 Keyboard — toggle with Enter, close with Escape, focus returns", async ({
	page,
}) => {
	await page.goto("/demo/dropdown-nav");
	await page.waitForLoadState("domcontentloaded");
	const button = page.getByRole("button", { name: "Products" });
	await button.focus();
	await page.keyboard.press("Enter");
	const dropdown = page.locator("#dropdown-nav");
	await expect(dropdown).toBeVisible();
	await expect(dropdown.getByRole("link")).toHaveCount(3);
	await page.keyboard.press("Escape");
	await expect(dropdown).toBeHidden();
	await expect(button).toBeFocused();
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — icon-only trigger has accessible name", async ({
	page,
}) => {
	await page.goto("/demo/dropdown-item-list");
	await page.waitForLoadState("domcontentloaded");
	const button = page.getByRole("button", { name: "Actions for Step 1" });
	await expect(button).toBeVisible();
});

test("item list rows are not clickable rows", async ({ page }) => {
	await page.goto("/demo/dropdown-item-list");
	await page.waitForLoadState("domcontentloaded");
	await expect(page.locator('[is="ds-task"]')).toHaveCount(0);
	await page.getByRole("button", { name: "Actions for Step 2" }).click();
	await expect(page.locator("#item-2-menu")).toBeVisible();
	expect(new URL(page.url()).pathname).toBe("/demo/dropdown-item-list");
});
