import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/form-input-fetch-typeahead";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 4.1.2 Name, Role, Value — input is a labelled combobox", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const combobox = page.getByRole("combobox", { name: "Country" });
	await expect(combobox).toBeVisible();
	await expect(combobox).toHaveAttribute("aria-expanded", "false");
	await expect(combobox).not.toHaveAttribute("list");
});

test("WCAG 2.2 A 2.1.1 Keyboard — suggestions load from the endpoint and are selectable", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const combobox = page.getByRole("combobox", { name: "Country" });
	const request = page.waitForRequest(
		(req) =>
			new URL(req.url()).pathname === "/api/fetch-typeahead.json" &&
			new URL(req.url()).searchParams.get("q") === "Can",
	);
	await combobox.pressSequentially("Can");
	await request;
	await expect(combobox).toHaveAttribute("aria-expanded", "true");
	const option = page.getByRole("option", { name: "Canada" });
	await expect(option).toBeVisible();
	await combobox.press("ArrowDown");
	await expect(combobox).toHaveAttribute("aria-activedescendant", /.+/);
	await option.click();
	await expect(combobox).toHaveValue("Canada");
	await expect(combobox).toHaveAttribute("aria-expanded", "false");
});

test.describe("endpoint failure", () => {
	test.use({ serviceWorkers: "block" });

	test("falls back to the inline options", async ({ page }) => {
		await page.route("**/api/fetch-typeahead.json**", (route) =>
			route.fulfill({ status: 500, body: "" }),
		);
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");
		const combobox = page.getByRole("combobox", { name: "Country" });
		await combobox.pressSequentially("ger");
		await expect(page.getByRole("option", { name: "Germany" })).toBeVisible();
		await expect(page.getByRole("option", { name: "Canada" })).toHaveCount(0);
	});
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
