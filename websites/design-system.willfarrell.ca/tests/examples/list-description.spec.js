import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/list-description";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — list has dl with dt and dd children", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const dl = page.locator("dl");
	await expect(dl.first()).toBeVisible();

	const dt = dl.first().locator("dt");
	const dd = dl.first().locator("dd");
	expect(await dt.count()).toBeGreaterThan(0);
	expect(await dd.count()).toBeGreaterThan(0);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
