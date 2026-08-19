import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-password";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 AA 1.3.5 Identify Input Purpose — inputs have autocomplete current-password or new-password", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const inputs = page.locator('input[type="password"]');
	const count = await inputs.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const input = inputs.nth(i);
		const autocomplete = await input.getAttribute("autocomplete");
		expect(autocomplete).toBeTruthy();
		const valid = ["current-password", "new-password"];
		const hasValidAutocomplete = valid.some((v) => autocomplete.includes(v));
		expect(hasValidAutocomplete).toBe(true);
	}
});

test("WCAG 2.2 A 3.3.2 Labels or Instructions — labels present", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const inputs = page.locator('input[type="password"]');
	const count = await inputs.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const input = inputs.nth(i);
		const id = await input.getAttribute("id");
		const ariaLabel = await input.getAttribute("aria-label");
		const ariaLabelledBy = await input.getAttribute("aria-labelledby");
		const label = id ? page.locator(`label[for="${id}"]`) : null;
		const hasLabel =
			(label && (await label.count()) > 0) || ariaLabel || ariaLabelledBy;
		expect(hasLabel).toBeTruthy();
	}
});

test("reveal button toggles password visibility", async ({ page }) => {
	await page.goto(path);
	const input = page.locator('input[is="ds-input-password"]');
	const button = page.locator('input[is="ds-input-password"] + button');
	await expect(button).toBeVisible();
	await button.click();
	await expect(input).toHaveAttribute("type", "text");
	await expect(button).toHaveAttribute("aria-pressed", "true");
	await button.click();
	await expect(input).toHaveAttribute("type", "password");
	await expect(button).toHaveAttribute("aria-pressed", "false");
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
