import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/headings";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — heading levels h2-h6 are present", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	for (const level of [2, 3, 4, 5, 6]) {
		const heading = page.locator(`h${level}`).first();
		await expect(heading).toBeVisible();
	}
});

test("WCAG 2.2 AA 2.4.6 Headings and Labels — headings have text content", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const headings = page.locator("h2, h3, h4, h5, h6");
	const count = await headings.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const text = await headings.nth(i).textContent();
		expect(text.trim().length).toBeGreaterThan(0);
	}
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
