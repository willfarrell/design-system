import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/codeblock-scan";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — every block has a heading", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expect(page.getByRole("heading", { level: 2 })).toHaveText([
		"DNS",
		"HTTP headers",
	]);
	const headings = page.getByRole("heading", { level: 3 });
	const blocks = page.locator("pre");
	await expect(blocks).toHaveCount(await headings.count());
});

test("blocks hold the bare value, no record prefix or header name", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const code = page.locator('code[is="ds-codeblock-highlight"]');
	await expect(code.first()).toHaveText("tardisec-verification=abc123def456");
	const hsts = page
		.getByRole("heading", { name: "Strict-Transport-Security" })
		.locator("xpath=following-sibling::pre[1]/code");
	await expect(hsts).toHaveText(/^max-age=31536000/);
});

test("each block offers copy and download controls", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const first = page.locator('[is="ds-codeblock-actions"]').first();
	await expect(first.getByRole("button", { name: "Copy" })).toBeVisible();
	await expect(first.getByRole("button", { name: "Download" })).toBeVisible();
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
