import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/download";

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
	await expect(page.getByRole("button", { name: "Download" })).toBeVisible();
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

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
