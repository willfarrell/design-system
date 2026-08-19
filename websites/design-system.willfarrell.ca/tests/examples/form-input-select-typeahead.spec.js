import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-select-typeahead";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — combobox role present", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const comboboxes = page.getByRole("combobox");
	const count = await comboboxes.count();
	expect(count).toBeGreaterThan(0);
});

test("WCAG 2.2 A 3.3.2 Labels or Instructions — combobox has accessible name", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const combobox = page.getByRole("combobox").first();
	await expect(combobox).toHaveAccessibleName(/country/i);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
