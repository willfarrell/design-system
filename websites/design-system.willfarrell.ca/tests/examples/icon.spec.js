import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/icon";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.1.1 Non-text Content — decorative icons are hidden from assistive tech", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const svgs = page.locator("svg");
	const count = await svgs.count();
	expect(count).toBeGreaterThan(0);
	for (let i = 0; i < count; i++) {
		const ariaHidden = await svgs.nth(i).getAttribute("aria-hidden");
		expect(ariaHidden).toBe("true");
	}
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — icon SVGs are decorative with aria-hidden", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const svgs = page.locator("svg");
	const count = await svgs.count();
	expect(count).toBeGreaterThan(0);
	for (let i = 0; i < count; i++) {
		const svg = svgs.nth(i);
		const ariaHidden = await svg.getAttribute("aria-hidden");
		expect(ariaHidden).toBe("true");
		const role = await svg.getAttribute("role");
		if (role !== null) {
			expect(role).not.toBe("img");
		}
	}
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
