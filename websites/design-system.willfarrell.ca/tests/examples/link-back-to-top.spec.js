import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/link-back-to-top";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 2.4.4 Link Purpose — link has discernible text", async ({
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
		const hasText = text.trim().length > 0 || !!ariaLabel;
		expect(hasText).toBeTruthy();
	}
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
