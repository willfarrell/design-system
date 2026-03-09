import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-textarea";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 3.3.2 Labels or Instructions — label present", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const textareas = page.locator("textarea");
	const count = await textareas.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const textarea = textareas.nth(i);
		const id = await textarea.getAttribute("id");
		const ariaLabel = await textarea.getAttribute("aria-label");
		const ariaLabelledBy = await textarea.getAttribute("aria-labelledby");
		const label = id ? page.locator(`label[for="${id}"]`) : null;
		const hasLabel =
			(label && (await label.count()) > 0) || ariaLabel || ariaLabelledBy;
		expect(hasLabel).toBeTruthy();
	}
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — textarea has textbox role", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const textboxes = page.getByRole("textbox");
	const count = await textboxes.count();
	expect(count).toBeGreaterThan(0);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
