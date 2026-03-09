import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/task-list";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — list structure with ul/ol and li", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const list = page.locator("ul, ol");
	await expect(list.first()).toBeVisible();
	const items = list.first().locator("li");
	const count = await items.count();
	expect(count).toBeGreaterThan(0);
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — task items have links", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const links = page.locator("li[is='ds-task'] a");
	const count = await links.count();
	expect(count).toBeGreaterThan(0);
	for (let i = 0; i < count; i++) {
		const name = await links.nth(i).textContent();
		expect(name?.trim().length).toBeGreaterThan(0);
	}
});

test("Text selection on task does not trigger navigation", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const task = page.locator('[is="ds-task"]').first();
	const box = await task.boundingBox();
	// Simulate a slow click-drag (>200ms) to select text
	await page.mouse.move(box.x + 20, box.y + box.height / 2);
	await page.mouse.down();
	await page.waitForTimeout(250);
	await page.mouse.move(box.x + 150, box.y + box.height / 2);
	await page.mouse.up();
	expect(page.url()).toContain(path);
});

test("WCAG 2.2 A 2.1.1 Keyboard — task link is keyboard accessible", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const link = page.locator('[is="ds-task"] a').first();
	await link.focus();
	await expect(link).toBeFocused();
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
