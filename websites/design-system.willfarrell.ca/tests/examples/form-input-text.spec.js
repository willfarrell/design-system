import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-text";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — label associated with input", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const inputs = page.locator('input[type="text"], input:not([type])');
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

test("WCAG 2.2 A 3.3.2 Labels or Instructions — label visible", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const labels = page.locator("label");
	const count = await labels.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const label = labels.nth(i);
		await expect(label).toBeVisible();
	}
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
