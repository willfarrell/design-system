import { expect, test } from "@playwright/test";

const heroAnimationName = (page) =>
	page
		.locator(".hero")
		.first()
		.evaluate((el) => getComputedStyle(el, "::before").animationName);

test("hero background animates when motion is allowed", async ({ page }) => {
	await page.emulateMedia({ reducedMotion: "no-preference" });
	await page.goto("/");
	expect(await heroAnimationName(page)).toBe("hero-shader");
});

test("hero background is static when reduced motion is requested", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/");
	expect(await heroAnimationName(page)).toBe("none");
});

test("hero background animation pauses when the pause toggle is checked", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "no-preference" });
	await page.goto("/");
	const hero = page.locator(".hero").first();
	const playState = () =>
		hero.evaluate((el) => getComputedStyle(el, "::before").animationPlayState);
	expect(await playState()).toBe("running");
	await hero.getByRole("checkbox", { name: "Pause animations" }).check();
	expect(await playState()).toBe("paused");
});
