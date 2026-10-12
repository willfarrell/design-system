import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/task-list-sortable";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

const labels = (page) =>
	page.locator('[is="ds-task-sortable"] li a').allTextContents();

test("WCAG 2.2 A 4.1.2 Name, Role, Value — sort select is named", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expect(page.getByRole("combobox", { name: "Sort by" })).toBeVisible();
	await expect(page.getByRole("link", { name: "Add domain" })).toBeVisible();
});

test("server order is kept until a sort is chosen", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	expect(await labels(page)).toEqual([
		"alpha.example.com",
		"charlie.example.com",
		"bravo.example.com",
	]);
});

test("choosing a sort reorders the rows by data-sort-*", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const select = page.getByRole("combobox", { name: "Sort by" });
	await select.selectOption("-name");
	await expect(page.locator('[is="ds-task-sortable"] li a')).toHaveText([
		"charlie.example.com",
		"bravo.example.com",
		"alpha.example.com",
	]);
	await select.selectOption("-updated");
	await expect(page.locator('[is="ds-task-sortable"] li a')).toHaveText([
		"charlie.example.com",
		"bravo.example.com",
		"alpha.example.com",
	]);
	await select.selectOption("name");
	await expect(page.locator('[is="ds-task-sortable"] li a')).toHaveText([
		"alpha.example.com",
		"bravo.example.com",
		"charlie.example.com",
	]);
});

test("rows stay task rows after the sortable upgrades", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expect
		.poll(() =>
			page.evaluate(() => customElements.get("ds-task") !== undefined),
		)
		.toBe(true);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
