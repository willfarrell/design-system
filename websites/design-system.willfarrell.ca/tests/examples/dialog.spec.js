import { expect, test } from "@playwright/test";

const path = "/demo/dialog";

test("Dialog (screenshots)", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("networkidle");
	// Closed state
	await expect(page.getByRole("button")).toBeVisible();
	await expect(page.getByRole("dialog")).toBeHidden();
	await expect(page).toHaveScreenshot();
	// Open state
	await page.getByRole("button", { name: "Open dialog" }).click();
	await expect(page.getByRole("dialog")).toBeVisible();
	await expect(page).toHaveScreenshot();
});

test("Dialog (pointer)", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("networkidle");
	// Use <button>
	await page.getByRole("button", { name: "Open dialog" }).click();
	await expect(page.getByRole("dialog")).toBeVisible();
	await page.getByRole("button", { name: "close" }).click();
	await expect(page.getByRole("dialog")).toBeHidden();

	// Use background
	await page.getByRole("button", { name: "Open dialog" }).click();
	await expect(page.getByRole("dialog")).toBeVisible();
	await page.locator("html").click();
	await expect(page.getByRole("dialog")).toBeHidden();
});

test("Dialog (keyboard)", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("networkidle");
	// Use <button>
	// TODO ensure dialog is not discoverable
	await page.locator("html").press("Tab");
	await expect(page.getByRole("button", { name: "Open dialog" })).toBeFocused();
	await page.getByRole("button", { name: "Open dialog" }).press("Enter");
	await expect(page.getByRole("dialog")).toBeVisible();
	await expect(page.getByRole("button", { name: "close" })).toBeFocused();
	await page.getByRole("button", { name: "close" }).press("Enter");
	await expect(page.getByRole("dialog")).toBeHidden();
	await expect(page.getByRole("button", { name: "Open dialog" })).toBeFocused();

	// Use Esc
	await page.getByRole("button", { name: "Open dialog" }).press("Enter");
	await page.getByRole("dialog").press("Escape");
	await expect(page.getByRole("dialog")).toBeHidden();
});
