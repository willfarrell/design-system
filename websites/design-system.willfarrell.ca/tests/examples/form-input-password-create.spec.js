import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-password-create";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 AA 1.3.5 Identify Input Purpose — new-password follows username", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expect(page.locator("#username")).toHaveAttribute(
		"autocomplete",
		"username",
	);
	const password = page.locator("#new-password");
	await expect(password).toHaveAttribute("type", "password");
	await expect(password).toHaveAttribute("autocomplete", "new-password");
	await expect(password).toHaveAccessibleName(/Create a password/);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
