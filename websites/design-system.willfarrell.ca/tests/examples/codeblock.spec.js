import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/codeblock";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("code renders verbatim inside a pre", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const code = page.locator('pre > code[data-lang="js"]');
	await expect(code).toHaveCount(1);
	await expect(code).toContainText("function greet(name) {");
	await expect(code).toContainText('greet("world");');
});

test("copy places the code on the clipboard", async ({
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
	await page.getByRole("button", { name: "Copy" }).click();
	const text = await page.evaluate(() => navigator.clipboard.readText());
	expect(text).toContain("function greet(name) {");
	expect(text).toContain('greet("world");');
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
