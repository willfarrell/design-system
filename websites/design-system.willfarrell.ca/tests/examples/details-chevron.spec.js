import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/details-chevron";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — details has summary", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const details = page.locator("details");
	const count = await details.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const summary = details.nth(i).locator("summary");
		await expect(summary).toBeVisible();
	}
});

test("WCAG 2.2 A 2.1.1 Keyboard — toggle via Enter key", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const summary = page.locator("summary").first();
	const details = page.locator("details").first();

	const wasOpen = await details.getAttribute("open");

	await summary.focus();
	await page.keyboard.press("Enter");

	if (wasOpen !== null) {
		await expect(details).not.toHaveAttribute("open", "");
	} else {
		await expect(details).toHaveAttribute("open");
	}
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
