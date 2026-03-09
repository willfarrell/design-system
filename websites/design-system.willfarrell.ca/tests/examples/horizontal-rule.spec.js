import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/horizontal-rule";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — hr has separator role", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const hr = page.locator("hr");
	await expect(hr.first()).toBeVisible();

	const role = await hr.first().getAttribute("role");
	if (role) {
		expect(role).toBe("separator");
	} else {
		// hr has implicit separator role
		await expect(hr.first()).toBeVisible();
	}
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
