import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/copy-download";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — controls are named buttons", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expect(
		page.getByRole("button", { name: "Copy", exact: true }),
	).toBeVisible();
	await expect(page.getByRole("button", { name: "Download" })).toBeVisible();
	await expect(page.getByRole("button", { name: "Copy record" })).toBeVisible();
});

test("download saves the referenced element's text under data-filename", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const [download] = await Promise.all([
		page.waitForEvent("download"),
		page.getByRole("button", { name: "Download" }).click(),
	]);
	expect(download.suggestedFilename()).toBe("dns.txt");
});

test("copy writes the value and announces the confirmation", async ({
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
	const button = page.locator('button[is="ds-copy"][data-value]');
	await button.click();
	await expect(button).toHaveAccessibleName("Record copied");
	await expect(
		button.locator("xpath=following-sibling::*[1][@role='status']"),
	).toHaveText("Record copied");
	expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
		"tardisec-verification=abc123def456",
	);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
