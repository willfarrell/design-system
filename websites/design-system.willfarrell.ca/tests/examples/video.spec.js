import { test } from "@playwright/test";
import {
	expectNoAxeViolations,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/video";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
