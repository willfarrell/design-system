import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/alert";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 AA 4.1.3 Status Messages — role alert or role status present", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const alertElements = page.locator('[role="alert"]');
	const statusElements = page.locator('[role="status"]');

	const alertCount = await alertElements.count();
	const statusCount = await statusElements.count();

	expect(alertCount).toBeGreaterThan(0);
	expect(statusCount).toBeGreaterThan(0);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
