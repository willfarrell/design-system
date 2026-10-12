import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-organization";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — input has an associated label", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expect(
		page.getByRole("textbox", { name: /Organization/ }),
	).toBeVisible();
});

test("WCAG 2.2 AA 1.3.5 Identify Input Purpose — autocomplete is organization", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expect(page.locator("#organization")).toHaveAttribute(
		"autocomplete",
		/\borganization\b/,
	);
});

test("WCAG 2.2 A 3.3.2 Labels or Instructions — hint is described", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expect(page.locator("#organization")).toHaveAccessibleDescription(
		/company or organization you represent/,
	);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
