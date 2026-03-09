import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-address";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 AA 1.3.5 Identify Input Purpose — address inputs have autocomplete attributes", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const inputs = page.locator(
		"input[autocomplete], select[autocomplete], textarea[autocomplete]",
	);
	const count = await inputs.count();
	expect(count).toBeGreaterThan(0);

	const validValues = [
		"street-address",
		"address-line1",
		"address-line2",
		"address-line3",
		"address-level1",
		"address-level2",
		"address-level3",
		"address-level4",
		"postal-code",
		"country",
		"country-name",
	];

	const foundValues = [];
	for (let i = 0; i < count; i++) {
		const input = inputs.nth(i);
		const autocomplete = await input.getAttribute("autocomplete");
		if (autocomplete) {
			const hasValid = validValues.some((v) => autocomplete.includes(v));
			if (hasValid) {
				foundValues.push(autocomplete);
			}
		}
	}

	expect(foundValues.length).toBeGreaterThan(0);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
