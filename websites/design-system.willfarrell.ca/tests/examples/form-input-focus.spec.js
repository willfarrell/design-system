import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-focus";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 AA 2.4.7 Focus Visible — every control shows an outline when focused", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	for (const label of ["Text", "Textarea", "Select", "File"]) {
		const control = page.getByLabel(label, { exact: true });
		await control.focus();
		await expect(control).toBeFocused();
		const outline = await control.evaluate((el) => {
			const style = getComputedStyle(el);
			return { style: style.outlineStyle, width: style.outlineWidth };
		});
		expect(outline.style, label).not.toBe("none");
		expect(Number.parseFloat(outline.width), label).toBeGreaterThan(0);
	}
});

test("WCAG 2.2 A 2.4.3 Focus Order — Tab follows the visual order", async ({
	page,
	browserName,
}) => {
	test.skip(
		browserName === "webkit",
		"WebKit skips form controls on Tab by default",
	);
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await page.getByLabel("Text", { exact: true }).focus();
	const order = [
		page.getByLabel("Textarea", { exact: true }),
		page.getByLabel("Select", { exact: true }),
		page.locator("#checkbox-focus-a"),
		page.locator("#checkbox-focus-b"),
		page.locator("#radio-focus-a"),
	];
	for (const control of order) {
		await page.keyboard.press("Tab");
		await expect(control).toBeFocused();
	}
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
