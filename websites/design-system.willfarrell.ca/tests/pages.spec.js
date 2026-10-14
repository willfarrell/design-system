import { globSync } from "node:fs";
import { test } from "@playwright/test";
import { expectNoAxeViolations } from "./a11y.js";

const routesDir = new URL("../src/routes/", import.meta.url).pathname;

const paths = globSync("**/+page.svelte", { cwd: routesDir })
	.map(
		(file) =>
			`/${file}`.replace(/\/\+page\.svelte$/, "").replace(/\/\([^/]+\)/g, "") ||
			"/",
	)
	.filter((loc) => !loc.includes("["))
	.sort();

const modes = [
	{ name: "light", media: { colorScheme: "light" } },
	{ name: "dark", media: { colorScheme: "dark" } },
	{
		name: "light + forced-colors: active",
		media: { colorScheme: "light", forcedColors: "active" },
	},
	{
		name: "dark + forced-colors: active",
		media: { colorScheme: "dark", forcedColors: "active" },
	},
	{
		name: "light + reduced-motion",
		media: { colorScheme: "light", reducedMotion: "reduce" },
	},
];

for (const path of paths) {
	test.describe(path, () => {
		for (const { name, media } of modes) {
			test(`axe audit — ${name}`, async ({ page }) => {
				await page.emulateMedia(media);
				await page.goto(path);
				await page.waitForLoadState("domcontentloaded");
				await expectNoAxeViolations(page);
			});
		}

		test("axe audit — prefers-contrast: more", async ({
			page,
			browserName,
		}) => {
			test.skip(
				browserName !== "chromium",
				"prefers-contrast emulation requires Chromium CDP",
			);
			const client = await page.context().newCDPSession(page);
			await client.send("Emulation.setEmulatedMedia", {
				features: [{ name: "prefers-contrast", value: "more" }],
			});
			await page.goto(path);
			await page.waitForLoadState("domcontentloaded");
			await expectNoAxeViolations(page);
		});
	});
}
