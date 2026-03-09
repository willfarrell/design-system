import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-checkbox";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — fieldset and legend groups checkboxes", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const fieldsets = page.locator("fieldset");
	const count = await fieldsets.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const fieldset = fieldsets.nth(i);
		const legend = fieldset.locator("legend");
		expect(await legend.count()).toBeGreaterThan(0);
	}
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — inputs have checkbox role", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const checkboxes = page.getByRole("checkbox");
	const count = await checkboxes.count();
	expect(count).toBeGreaterThan(0);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
