import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-radio-group";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — nested fieldsets each have a legend", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expect(
		page.getByRole("group", { name: /Radios with groups/ }),
	).toBeVisible();
	await expect(page.getByRole("group", { name: /Group one/ })).toBeVisible();
	await expect(page.getByRole("group", { name: /Group two/ })).toBeVisible();
	await expect(
		page.getByRole("group", { name: /Group one/ }).getByRole("radio"),
	).toHaveCount(2);
	await expect(
		page.getByRole("group", { name: /Group two/ }).getByRole("radio"),
	).toHaveCount(2);
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — options share one name across groups", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const inputs = page.getByRole("radio");
	await expect(inputs).toHaveCount(4);
	for (const input of await inputs.all()) {
		await expect(input).toHaveAttribute("name", "radio-group");
	}
	await expect(page.getByRole("radio", { name: /Option a/ })).toBeChecked();
});

test("one selection across every group", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await page.getByRole("radio", { name: /Option d/ }).check();
	await expect(page.getByRole("radio", { name: /Option d/ })).toBeChecked();
	await expect(page.getByRole("radio", { name: /Option a/ })).not.toBeChecked();
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
