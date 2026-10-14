import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/tooltip";

const enhanced = (page) =>
	page.evaluate(
		() =>
			CSS.supports("anchor-name: --a") &&
			Boolean(HTMLElement.prototype.showPopover),
	);

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — title stays as the accessible description", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expect(page.getByRole("button", { name: "Save" })).toHaveAttribute(
		"title",
		"Saves without leaving the page",
	);
	await expect(page.getByRole("link", { name: "Popover" })).toHaveAttribute(
		"title",
		"Non-modal overlay shown on demand",
	);
	await expect(page.locator("abbr")).toHaveAttribute(
		"title",
		"Web Hypertext Application Technology Working Group",
	);
});

test("WCAG 2.2 AA 1.4.13 Content on Hover or Focus — tooltip shows on focus and dismisses with Escape", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	test.skip(!(await enhanced(page)), "anchor positioning unsupported");
	const abbr = page.locator("abbr");
	await expect(abbr).toHaveAttribute("tabindex", "0");
	const tooltip = page.locator(".ds-tooltip", {
		hasText: "Web Hypertext Application Technology Working Group",
	});
	await expect(tooltip).toHaveAttribute("aria-hidden", "true");
	await expect(tooltip).toBeHidden();
	await abbr.focus();
	await expect(tooltip).toBeVisible();
	await page.keyboard.press("Escape");
	await expect(tooltip).toBeHidden();
});

test("tooltip shows on hover without the native title tooltip", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	test.skip(!(await enhanced(page)), "anchor positioning unsupported");
	const button = page.getByRole("button", { name: "Save" });
	const tooltip = page.locator(".ds-tooltip", {
		hasText: "Saves without leaving the page",
	});
	await button.hover();
	await expect(tooltip).toBeVisible();
	await expect(button).toHaveAttribute("title", "");
	await page.mouse.move(0, 0);
	await expect(tooltip).toBeHidden();
	await expect(button).toHaveAttribute(
		"title",
		"Saves without leaving the page",
	);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
