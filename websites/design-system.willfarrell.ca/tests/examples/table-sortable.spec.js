import { expect, test } from "@playwright/test";
import { expectNoAxeViolations } from "../a11y.js";

const path = "/demo/table-sortable";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("sorts tbody rows ascending, descending; tfoot untouched", async ({
	page,
}) => {
	await page.goto(path);
	const header = page
		.locator("thead th", { hasText: "Name" })
		.locator("button");
	await header.waitFor();

	await header.click();
	await expect(page.locator("tbody tr th").first()).toHaveText("Apple");
	await expect(page.locator('thead th[aria-sort="ascending"]')).toHaveCount(1);

	await header.click();
	await expect(page.locator("tbody tr th").first()).toHaveText("Cherry");
	await expect(page.locator('thead th[aria-sort="descending"]')).toHaveCount(1);

	await expect(page.locator("tfoot tr th")).toHaveText("Total");
});

test("numeric column sorts numerically, not lexically", async ({ page }) => {
	await page.goto(path);
	const header = page
		.locator("thead th", { hasText: "Quantity" })
		.locator("button");
	await header.waitFor();

	await header.click();
	await expect(page.locator("tbody tr th").first()).toHaveText("Apple");
	await expect(page.locator("tbody tr th").last()).toHaveText("Cherry");
});

// sorting the rendered "1,234" would collate as 1 and put Banana first
test("data[value] outranks the localized label", async ({ page }) => {
	await page.goto(path);
	const header = page
		.locator("thead th", { hasText: "Views" })
		.locator("button");
	await header.waitFor();

	await header.click();
	await expect(page.locator("tbody tr th").first()).toHaveText("Apple");
	await expect(page.locator("tbody tr th").last()).toHaveText("Cherry");
});
