import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-select";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — select has combobox role", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const comboboxes = page.getByRole("combobox");
	const count = await comboboxes.count();
	expect(count).toBeGreaterThan(0);
});

test("WCAG 2.2 A 3.3.2 Labels or Instructions — label present", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const selects = page.locator("select");
	const count = await selects.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const select = selects.nth(i);
		const id = await select.getAttribute("id");
		const ariaLabel = await select.getAttribute("aria-label");
		const ariaLabelledBy = await select.getAttribute("aria-labelledby");
		const label = id ? page.locator(`label[for="${id}"]`) : null;
		const hasLabel =
			(label && (await label.count()) > 0) || ariaLabel || ariaLabelledBy;
		expect(hasLabel).toBeTruthy();
	}
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
