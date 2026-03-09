import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/link";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 2.4.4 Link Purpose — links have discernible text", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const links = page.locator("a[href]");
	const count = await links.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const link = links.nth(i);
		const text = await link.textContent();
		const ariaLabel = await link.getAttribute("aria-label");
		const ariaLabelledBy = await link.getAttribute("aria-labelledby");
		const hasDiscernibleText =
			text.trim().length > 0 || ariaLabel || ariaLabelledBy;
		expect(hasDiscernibleText).toBeTruthy();
	}
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — link role present", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const links = page.getByRole("link");
	const count = await links.count();
	expect(count).toBeGreaterThan(0);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
