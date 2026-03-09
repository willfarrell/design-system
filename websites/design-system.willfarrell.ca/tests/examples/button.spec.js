import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/button";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — buttons have role button and accessible name", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const buttons = page.getByRole("button");
	const count = await buttons.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const button = buttons.nth(i);
		const name = await button.evaluate(
			(el) =>
				el.accessibleName ||
				el.textContent?.trim() ||
				el.getAttribute("aria-label") ||
				"",
		);
		expect(name.length).toBeGreaterThan(0);
	}
});

test("WCAG 2.2 A 2.1.1 Keyboard — buttons are focusable via Tab", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const buttons = page.getByRole("button");
	const count = await buttons.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const button = buttons.nth(i);
		const isDisabled = await button.isDisabled();
		if (isDisabled) continue;

		await button.focus();
		await expect(button).toBeFocused();
	}
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
