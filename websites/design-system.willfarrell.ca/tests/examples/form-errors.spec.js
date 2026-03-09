import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-errors";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 3.3.1 Error Identification — error messages present and associated with fields", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const alertElements = page.locator('[role="alert"]');
	const describedByElements = page.locator("[aria-describedby]");
	const totalCount =
		(await alertElements.count()) + (await describedByElements.count());
	expect(totalCount).toBeGreaterThan(0);
});

test("WCAG 2.2 A 3.3.2 Labels or Instructions — form has labels", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const inputs = page.locator("input, select, textarea");
	const count = await inputs.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const input = inputs.nth(i);
		const type = await input.getAttribute("type");
		if (type === "hidden") continue;

		const id = await input.getAttribute("id");
		const ariaLabel = await input.getAttribute("aria-label");
		const ariaLabelledBy = await input.getAttribute("aria-labelledby");
		const label = id ? page.locator(`label[for="${id}"]`) : null;
		const hasLabel =
			(label && (await label.count()) > 0) || ariaLabel || ariaLabelledBy;
		expect(hasLabel).toBeTruthy();
	}
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
