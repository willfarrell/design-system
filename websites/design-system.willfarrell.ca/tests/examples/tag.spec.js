import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/tag";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 2.4.4 Link Purpose — tag links have text content", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const links = page.getByRole("link");
	const count = await links.count();
	expect(count).toBeGreaterThan(0);
	for (let i = 0; i < count; i++) {
		const text = await links.nth(i).textContent();
		expect(text.trim().length).toBeGreaterThan(0);
	}
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — tag elements have link role", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const links = page.getByRole("link");
	const count = await links.count();
	expect(count).toBeGreaterThan(0);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
