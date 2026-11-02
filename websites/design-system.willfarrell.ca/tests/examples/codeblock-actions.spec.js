import { expect, test } from "@playwright/test";
import { expectNoAxeViolations } from "../a11y.js";

const path = "/demo/codeblock-actions";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expect(
		page.locator('[is="ds-codeblock-actions"]').first().locator("button"),
	).toHaveCount(1);
	await expectNoAxeViolations(page);
});

test("download control is opt in", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const blocks = page.locator('[is="ds-codeblock-actions"]');
	await expect(blocks).toHaveCount(3);
	await expect(blocks.nth(0).locator("button")).toHaveCount(1);
	await expect(blocks.nth(2).locator("button")).toHaveCount(2);
	await expect(
		blocks.nth(2).getByRole("button", { name: "Download" }),
	).toBeVisible();
});

test("copy writes the code block and announces the confirmation", async ({
	page,
	context,
	browserName,
}) => {
	test.skip(
		browserName !== "chromium",
		"clipboard permissions are Chromium only",
	);
	await context.grantPermissions(["clipboard-read", "clipboard-write"]);
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const button = page
		.locator('[is="ds-codeblock-actions"]')
		.first()
		.getByRole("button", { name: "Copy" });
	await button.click();
	await expect(button).toHaveAccessibleName("Copied");
	expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
		"npm install @willfarrell-ds/vanilla",
	);
});

test("codeblock offers both controls, copy in the corner", async ({ page }) => {
	await page.goto("/demo/codeblock");
	await page.waitForLoadState("domcontentloaded");
	const controls = page.locator('[is="ds-codeblock-actions"] > button');
	await expect(controls).toHaveCount(2);
	await expect(controls.nth(0)).toHaveAccessibleName("Copy");
	await expect(controls.nth(1)).toHaveAccessibleName("Download");
	const [download] = await Promise.all([
		page.waitForEvent("download"),
		controls.nth(1).click(),
	]);
	expect(download.suggestedFilename()).toBe("code.txt");
});
