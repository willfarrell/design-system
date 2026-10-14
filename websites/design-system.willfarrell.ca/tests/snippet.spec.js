import { expect, test } from "@playwright/test";

test("snippet iframes are named after their example", async ({ page }) => {
	await page.goto("/component/badge");
	await expect(page.locator("iframe[src='/demo/badge']")).toHaveAttribute(
		"title",
		"Badge example",
	);
});
