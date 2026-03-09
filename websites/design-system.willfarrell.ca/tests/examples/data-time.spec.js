import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/data-time";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — time elements with datetime attribute present", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const timeElements = page.locator("time[datetime]");
	const count = await timeElements.count();
	expect(count).toBeGreaterThan(0);
	for (let i = 0; i < count; i++) {
		const datetime = await timeElements.nth(i).getAttribute("datetime");
		expect(datetime).not.toBeNull();
		expect(datetime.length).toBeGreaterThan(0);
	}
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
