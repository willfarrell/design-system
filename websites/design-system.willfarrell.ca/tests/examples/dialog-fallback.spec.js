import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/dialog-fallback";

test("Dialog Fallback (screenshots)", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await page.waitForFunction(() => customElements.get("ds-button-dialog"));
	// Closed state
	await expect(page.getByRole("button")).toBeVisible();
	await expect(page.getByRole("dialog")).toBeHidden();
	await expect(page).toHaveScreenshot();
	// Open state
	await page.getByRole("button", { name: "Open dialog" }).click();
	await expect(page.getByRole("dialog")).toBeVisible();
	await expect(page).toHaveScreenshot();
});

test("Dialog Fallback (pointer)", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await page.waitForFunction(() => customElements.get("ds-button-dialog"));
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

test("Dialog Fallback (keyboard)", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await page.waitForFunction(() => customElements.get("ds-button-dialog"));
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

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — dialog has dialog role and accessible label", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await page.waitForFunction(() => customElements.get("ds-button-dialog"));
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
		"WebKit does not load ds-dialog via IntersectionObserver when dialog is hidden/inert",
	);
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await page.waitForFunction(() => customElements.get("ds-button-dialog"));
	await page.getByRole("button", { name: "Open dialog" }).click();
	await expect(page.getByRole("dialog")).toBeVisible();
	await page.keyboard.press("Escape");
	await expect(page.getByRole("dialog")).toBeHidden();
	await expect(page.getByRole("button", { name: "Open dialog" })).toBeFocused();
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
