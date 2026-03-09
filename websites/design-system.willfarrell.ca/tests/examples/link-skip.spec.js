import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/link-skip";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 2.4.1 Bypass Blocks — skip link present and links to main content", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const skipLink = page.locator('a[href="#main"], a[href="#content"]').first();
	await expect(skipLink).toBeAttached();

	const href = await skipLink.getAttribute("href");
	const targetId = href.replace("#", "");
	const target = page.locator(`#${targetId}`);
	await expect(target).toBeAttached();
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
