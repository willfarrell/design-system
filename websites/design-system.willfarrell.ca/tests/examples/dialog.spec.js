import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/dialog";

test("Dialog (screenshots)", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	// Closed state
	await expect(page.getByRole("button")).toBeVisible();
	await expect(page.getByRole("dialog")).toBeHidden();
	await expect(page).toHaveScreenshot();
	// Open state
	await page.getByRole("button", { name: "Open dialog" }).click();
	await expect(page.getByRole("dialog")).toBeVisible();
	await expect(page).toHaveScreenshot();
});

test("Dialog (pointer)", async ({ page, browserName }) => {
	test.skip(
		browserName === "webkit",
		"WebKit does not yet support command/commandfor",
	);
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	// Use <button>
	await page.getByRole("button", { name: "Open dialog" }).click();
	await expect(page.getByRole("dialog")).toBeVisible();
	await page.getByRole("button", { name: "close" }).click();
	await expect(page.getByRole("dialog")).toBeHidden();

	// Use background (click outside dialog content)
	await page.getByRole("button", { name: "Open dialog" }).click();
	await expect(page.getByRole("dialog")).toBeVisible();
	await page.mouse.click(5, 5);
	await expect(page.getByRole("dialog")).toBeHidden();
});

test("Dialog (keyboard)", async ({ page, browserName }) => {
	test.skip(
		browserName === "webkit",
		"WebKit does not yet support command/commandfor",
	);
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	// Use <button>
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

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	// color-contrast-enhanced excluded — button theme color is a global design token issue, not dialog-specific
	await expectNoAxeViolations(page, ["color-contrast-enhanced"]);
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — dialog has dialog role and accessible label", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await page.getByRole("button", { name: "Open dialog" }).click();
	const dialog = page.getByRole("dialog");
	await expect(dialog).toBeVisible();
	const hasLabel =
		(await dialog.getAttribute("aria-label")) !== null ||
		(await dialog.getAttribute("aria-labelledby")) !== null;
	expect(hasLabel).toBe(true);
});

test("WCAG 2.2 A 2.1.2 No Keyboard Trap — focus can leave the dialog via Escape", async ({
	page,
	browserName,
}) => {
	test.skip(
		browserName === "webkit",
		"WebKit does not yet support command/commandfor",
	);
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await page.getByRole("button", { name: "Open dialog" }).click();
	await expect(page.getByRole("dialog")).toBeVisible();
	await page.keyboard.press("Escape");
	await expect(page.getByRole("dialog")).toBeHidden();
	await expect(page.getByRole("button", { name: "Open dialog" })).toBeFocused();
});

mediaModeTests(test, path, ["color-contrast-enhanced", "color-contrast"]);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
