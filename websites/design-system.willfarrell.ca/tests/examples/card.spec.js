import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/card";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — card has heading structure", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const headings = page.getByRole("heading");
	const count = await headings.count();
	expect(count).toBeGreaterThan(0);
});

test("WCAG 2.2 A 2.4.4 Link Purpose — card links have discernible text", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const links = page.getByRole("link");
	const count = await links.count();
	for (let i = 0; i < count; i++) {
		const link = links.nth(i);
		const text = await link.textContent();
		const ariaLabel = await link.getAttribute("aria-label");
		const ariaLabelledby = await link.getAttribute("aria-labelledby");
		const hasDiscernibleText =
			(text && text.trim().length > 0) ||
			ariaLabel !== null ||
			ariaLabelledby !== null;
		expect(hasDiscernibleText).toBe(true);
	}
});

test("Text selection on card does not trigger navigation", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const card = page.locator('[is="ds-card"]').first();
	const box = await card.boundingBox();
	// Simulate a slow click-drag (>200ms) to select text
	await page.mouse.move(box.x + 20, box.y + box.height / 2);
	await page.mouse.down();
	await page.waitForTimeout(250);
	await page.mouse.move(box.x + 150, box.y + box.height / 2);
	await page.mouse.up();
	expect(page.url()).toContain(path);
});

test("WCAG 2.2 A 2.1.1 Keyboard — card link is keyboard accessible", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const link = page.locator('[is="ds-card"] a').first();
	await link.focus();
	await expect(link).toBeFocused();
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
