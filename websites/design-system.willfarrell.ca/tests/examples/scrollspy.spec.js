import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/demo/scrollspy";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 2.4.1 Bypass Blocks — nav is labelled and links target sections", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const nav = page.getByRole("navigation", { name: "On this page" });
	await expect(nav).toBeVisible();
	const links = nav.getByRole("link");
	await expect(links).toHaveCount(3);
	for (const hash of ["#introduction", "#usage", "#accessibility"]) {
		await expect(nav.locator(`a[href="${hash}"]`)).toHaveCount(1);
		await expect(page.locator(hash)).toHaveCount(1);
	}
});

test("the current link follows the scroll position", async ({ page }) => {
	await page.setViewportSize({ width: 800, height: 300 });
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const nav = page.getByRole("navigation", { name: "On this page" });
	const currentLinks = () =>
		nav
			.getByRole("link")
			.evaluateAll((links) =>
				links
					.filter((el) =>
						CSS.supports("scroll-target-group", "auto")
							? el.matches(":target-current")
							: el.getAttribute("aria-current") === "location",
					)
					.map((el) => el.getAttribute("href")),
			);
	await expect.poll(currentLinks).toEqual(["#introduction"]);
	await page.evaluate(() =>
		window.scrollTo(0, document.documentElement.scrollHeight),
	);
	await expect
		.poll(currentLinks)
		.toEqual([expect.stringMatching(/^#(usage|accessibility)$/)]);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
