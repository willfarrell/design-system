import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-browser-up-to-date";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

const userAgent = (chrome) =>
	`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chrome}.0.0.0 Safari/537.36`;

test.describe("current browser", () => {
	test.use({ userAgent: userAgent(155) });

	test("a current browser posts true", async ({ page }) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");
		const input = page.locator('input[is="ds-input-browser-up-to-date"]');
		await expect(input).toHaveAttribute("type", "hidden");
		await expect(input).toHaveValue("true");
	});
});

test.describe("outdated browser", () => {
	test.use({ userAgent: userAgent(100) });

	test("an outdated browser posts false", async ({ page }) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");
		const input = page.locator('input[is="ds-input-browser-up-to-date"]');
		await expect(input).toHaveValue("false");
	});
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
