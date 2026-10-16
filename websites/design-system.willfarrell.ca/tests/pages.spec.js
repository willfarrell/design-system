import { globSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { expectNoAxeViolations, forcedColorsDisabledRules } from "./a11y.js";
import { apcaBronzeFailures } from "./apca.js";

const routesDir = new URL("../src/routes/", import.meta.url).pathname;

const paths = globSync("**/+page.svelte", { cwd: routesDir })
	.map(
		(file) =>
			`/${file}`.replace(/\/\+page\.svelte$/, "").replace(/\/\([^/]+\)/g, "") ||
			"/",
	)
	.filter((loc) => !loc.includes("[") && loc !== "/component/dialog-fallback")
	.sort();

const apcaPaths = new Set([
	"/design-token/color",
	"/design-token/color-palette",
]);

const apcaExceptions = {
	"/design-token/color": [
		["dark", "contrast-no-preference level-1 del", "del", 75, 73.8],
		["dark", "contrast-no-preference level-2 del", "del", 75, 72.6],
		["dark", "contrast-no-preference level-3 del", "del", 75, 71.3],
		["dark", "contrast-no-preference level-4 del", "del", 75, 70.7],
		["dark", "contrast-no-preference level-5 del", "del", 75, 69.5],
	],
	"/design-token/color-palette": [
		["dark", "dark-a0 swatch-on-bg", "cerise-red", 75, 56],
		["dark", "dark-a0 swatch-on-bg", "cinnabar", 75, 55.9],
		["dark", "dark-a0 swatch-on-bg", "pizazz", 75, 73.9],
		["dark", "dark-a0 swatch-on-bg", "pomegranate", 75, 60.4],
		["dark", "dark-a0 swatch-on-bg", "red", 75, 63.2],
		["dark", "dark-a0 swatch-on-bg", "violet-eggplant", 75, 72.1],
		["dark", "dark-a0 swatch", "cerise-red", 75, 62.2],
		["dark", "dark-a0 swatch", "cinnabar", 75, 62],
		["dark", "dark-a0 swatch", "pomegranate", 75, 66.1],
		["dark", "dark-a0 swatch", "red", 75, 68.4],
		["dark", "dark-a12 swatch-on-bg", "cerise-red", 75, 65.2],
		["dark", "dark-a12 swatch-on-bg", "cinnabar", 75, 65],
		["dark", "dark-a12 swatch-on-bg", "pomegranate", 75, 69.9],
		["dark", "dark-a12 swatch-on-bg", "red", 75, 72.9],
		["dark", "dark-a12 swatch", "cerise-red", 75, 70.7],
		["dark", "dark-a12 swatch", "cinnabar", 75, 70.6],
		["dark", "dark-a12 swatch", "pomegranate", 75, 74.9],
		["dark", "dark-a16 swatch-on-bg", "cerise-red", 75, 66.9],
		["dark", "dark-a16 swatch-on-bg", "cinnabar", 75, 66.7],
		["dark", "dark-a16 swatch-on-bg", "pomegranate", 75, 71.7],
		["dark", "dark-a16 swatch-on-bg", "red", 75, 74.7],
		["dark", "dark-a16 swatch", "cerise-red", 75, 72.3],
		["dark", "dark-a16 swatch", "cinnabar", 75, 72.2],
		["dark", "dark-a8 swatch-on-bg", "cerise-red", 75, 62.2],
		["dark", "dark-a8 swatch-on-bg", "cinnabar", 75, 61.7],
		["dark", "dark-a8 swatch-on-bg", "pomegranate", 75, 66.5],
		["dark", "dark-a8 swatch-on-bg", "red", 75, 69.4],
		["dark", "dark-a8 swatch", "cerise-red", 75, 68],
		["dark", "dark-a8 swatch", "cinnabar", 75, 67.5],
		["dark", "dark-a8 swatch", "pomegranate", 75, 71.8],
		["dark", "dark-a8 swatch", "red", 75, 74.2],
		["dark", "dark-b0 swatch-on-bg", "cerise-red", 60, 45.5],
		["dark", "dark-b0 swatch-on-bg", "cinnabar", 60, 45.2],
		["dark", "dark-b0 swatch-on-bg", "pomegranate", 60, 49.5],
		["dark", "dark-b0 swatch-on-bg", "red", 60, 52],
		["dark", "dark-b0 swatch", "cerise-red", 60, 52.2],
		["dark", "dark-b0 swatch", "cinnabar", 60, 51.9],
		["dark", "dark-b0 swatch", "pomegranate", 60, 55.8],
		["dark", "dark-b0 swatch", "red", 60, 57.9],
		["dark", "dark-b12 swatch-on-bg", "cerise-red", 60, 53.2],
		["dark", "dark-b12 swatch-on-bg", "cinnabar", 60, 52.9],
		["dark", "dark-b12 swatch-on-bg", "pomegranate", 60, 57.3],
		["dark", "dark-b12 swatch-on-bg", "red", 60, 60],
		["dark", "dark-b12 swatch", "cerise-red", 60, 59.5],
		["dark", "dark-b12 swatch", "cinnabar", 60, 59.3],
		["dark", "dark-b16 swatch-on-bg", "cerise-red", 60, 56],
		["dark", "dark-b16 swatch-on-bg", "cinnabar", 60, 55.9],
		["dark", "dark-b8 swatch-on-bg", "cerise-red", 60, 50.4],
		["dark", "dark-b8 swatch-on-bg", "cinnabar", 60, 50.1],
		["dark", "dark-b8 swatch-on-bg", "pomegranate", 60, 54.7],
		["dark", "dark-b8 swatch-on-bg", "red", 60, 57.3],
		["dark", "dark-b8 swatch", "cerise-red", 60, 56.8],
		["dark", "dark-b8 swatch", "cinnabar", 60, 56.6],
		["dark", "dark-l0 swatch-on-bg", "cerise-red", 75, 66.2],
		["dark", "dark-l0 swatch-on-bg", "cinnabar", 75, 66],
		["dark", "dark-l0 swatch-on-bg", "pomegranate", 75, 70.2],
		["dark", "dark-l0 swatch-on-bg", "red", 75, 72.6],
		["dark", "dark-l0 swatch", "cerise-red", 75, 71],
		["dark", "dark-l0 swatch", "cinnabar", 75, 70.9],
		["dark", "dark-l1 swatch-on-bg", "cerise-red", 75, 63.5],
		["dark", "dark-l1 swatch-on-bg", "cinnabar", 75, 63.4],
		["dark", "dark-l1 swatch-on-bg", "pomegranate", 75, 67.7],
		["dark", "dark-l1 swatch-on-bg", "red", 75, 70.5],
		["dark", "dark-l1 swatch", "cerise-red", 75, 68.7],
		["dark", "dark-l1 swatch", "cinnabar", 75, 68.6],
		["dark", "dark-l1 swatch", "pomegranate", 75, 73.3],
		["dark", "dark-l2 swatch-on-bg", "cerise-red", 75, 62],
		["dark", "dark-l2 swatch-on-bg", "cinnabar", 75, 61.7],
		["dark", "dark-l2 swatch-on-bg", "pomegranate", 75, 66.2],
		["dark", "dark-l2 swatch-on-bg", "red", 75, 69],
		["dark", "dark-l2 swatch", "cerise-red", 75, 67.4],
		["dark", "dark-l2 swatch", "cinnabar", 75, 67.2],
		["dark", "dark-l2 swatch", "pomegranate", 75, 72],
		["dark", "dark-l2 swatch", "red", 75, 74.9],
		["dark", "dark-l3 swatch-on-bg", "cerise-red", 75, 60.6],
		["dark", "dark-l3 swatch-on-bg", "cinnabar", 75, 60.3],
		["dark", "dark-l3 swatch-on-bg", "pomegranate", 75, 64.9],
		["dark", "dark-l3 swatch-on-bg", "red", 75, 67.7],
		["dark", "dark-l3 swatch", "cerise-red", 75, 66.2],
		["dark", "dark-l3 swatch", "cinnabar", 75, 66],
		["dark", "dark-l3 swatch", "pomegranate", 75, 70.8],
		["dark", "dark-l3 swatch", "red", 75, 73.8],
		["dark", "dark-l4 swatch-on-bg", "cerise-red", 75, 60],
		["dark", "dark-l4 swatch-on-bg", "cinnabar", 75, 59.9],
		["dark", "dark-l4 swatch-on-bg", "pomegranate", 75, 64.5],
		["dark", "dark-l4 swatch-on-bg", "red", 75, 67.3],
		["dark", "dark-l4 swatch", "cerise-red", 75, 65.7],
		["dark", "dark-l4 swatch", "cinnabar", 75, 65.6],
		["dark", "dark-l4 swatch", "pomegranate", 75, 70.5],
		["dark", "dark-l4 swatch", "red", 75, 73.4],
		["dark", "dark-l5 swatch-on-bg", "cerise-red", 75, 59],
		["dark", "dark-l5 swatch-on-bg", "cinnabar", 75, 58.7],
		["dark", "dark-l5 swatch-on-bg", "pomegranate", 75, 63.3],
		["dark", "dark-l5 swatch-on-bg", "red", 75, 66.2],
		["dark", "dark-l5 swatch-on-bg", "violet-eggplant", 75, 74.3],
		["dark", "dark-l5 swatch", "cerise-red", 75, 64.7],
		["dark", "dark-l5 swatch", "cinnabar", 75, 64.6],
		["dark", "dark-l5 swatch", "pomegranate", 75, 69.5],
		["dark", "dark-l5 swatch", "red", 75, 72.4],
		["light", "light-a0 swatch-on-bg", "cerise-red", 75, 54],
		["light", "light-a0 swatch-on-bg", "cinnabar", 75, 54.2],
		["light", "light-a0 swatch-on-bg", "pizazz", 75, 70.7],
		["light", "light-a0 swatch-on-bg", "pomegranate", 75, 58.9],
		["light", "light-a0 swatch-on-bg", "red", 75, 62],
		["light", "light-a0 swatch-on-bg", "violet-eggplant", 75, 69.4],
		["light", "light-a0 swatch", "cerise-red", 75, 60.3],
		["light", "light-a0 swatch", "cinnabar", 75, 60.5],
		["light", "light-a0 swatch", "pomegranate", 75, 65.5],
		["light", "light-a0 swatch", "red", 75, 68.7],
		["light", "light-a12 swatch-on-bg", "cerise-red", 75, 59.2],
		["light", "light-a12 swatch-on-bg", "cinnabar", 75, 59.1],
		["light", "light-a12 swatch-on-bg", "pomegranate", 75, 63.7],
		["light", "light-a12 swatch-on-bg", "red", 75, 66.6],
		["light", "light-a12 swatch-on-bg", "violet-eggplant", 75, 74.5],
		["light", "light-a12 swatch", "cerise-red", 75, 64.9],
		["light", "light-a12 swatch", "cinnabar", 75, 64.9],
		["light", "light-a12 swatch", "pomegranate", 75, 69.8],
		["light", "light-a12 swatch", "red", 75, 72.8],
		["light", "light-a16 swatch-on-bg", "cerise-red", 75, 60.8],
		["light", "light-a16 swatch-on-bg", "cinnabar", 75, 60.7],
		["light", "light-a16 swatch-on-bg", "pomegranate", 75, 65.1],
		["light", "light-a16 swatch-on-bg", "red", 75, 67.9],
		["light", "light-a16 swatch", "cerise-red", 75, 66.4],
		["light", "light-a16 swatch", "cinnabar", 75, 66.3],
		["light", "light-a16 swatch", "pomegranate", 75, 71],
		["light", "light-a16 swatch", "red", 75, 73.9],
		["light", "light-a8 swatch-on-bg", "cerise-red", 75, 57.5],
		["light", "light-a8 swatch-on-bg", "cinnabar", 75, 57.5],
		["light", "light-a8 swatch-on-bg", "pomegranate", 75, 62.2],
		["light", "light-a8 swatch-on-bg", "red", 75, 65],
		["light", "light-a8 swatch-on-bg", "violet-eggplant", 75, 73.2],
		["light", "light-a8 swatch", "cerise-red", 75, 63.5],
		["light", "light-a8 swatch", "cinnabar", 75, 63.5],
		["light", "light-a8 swatch", "pomegranate", 75, 68.4],
		["light", "light-a8 swatch", "red", 75, 71.4],
		["light", "light-b0 swatch-on-bg", "cerise-red", 60, 46.9],
		["light", "light-b0 swatch-on-bg", "cinnabar", 60, 47.2],
		["light", "light-b0 swatch-on-bg", "pomegranate", 60, 51.2],
		["light", "light-b0 swatch-on-bg", "red", 60, 53.5],
		["light", "light-b0 swatch", "cerise-red", 60, 53.6],
		["light", "light-b0 swatch", "cinnabar", 60, 53.9],
		["light", "light-b0 swatch", "pomegranate", 60, 58.3],
		["light", "light-b12 swatch-on-bg", "cerise-red", 60, 52.5],
		["light", "light-b12 swatch-on-bg", "cinnabar", 60, 52.5],
		["light", "light-b12 swatch-on-bg", "pomegranate", 60, 57.4],
		["light", "light-b12 swatch", "cerise-red", 60, 58.9],
		["light", "light-b12 swatch", "cinnabar", 60, 58.9],
		["light", "light-b16 swatch-on-bg", "cerise-red", 60, 54.3],
		["light", "light-b16 swatch-on-bg", "cinnabar", 60, 54.2],
		["light", "light-b16 swatch-on-bg", "pomegranate", 60, 59.1],
		["light", "light-b8 swatch-on-bg", "cerise-red", 60, 50.7],
		["light", "light-b8 swatch-on-bg", "cinnabar", 60, 50.8],
		["light", "light-b8 swatch-on-bg", "pomegranate", 60, 55.6],
		["light", "light-b8 swatch-on-bg", "red", 60, 58.1],
		["light", "light-b8 swatch", "cerise-red", 60, 57.2],
		["light", "light-b8 swatch", "cinnabar", 60, 57.3],
		["light", "light-l0 swatch-on-bg", "cerise-red", 75, 66.9],
		["light", "light-l0 swatch-on-bg", "cinnabar", 75, 66.7],
		["light", "light-l0 swatch-on-bg", "pomegranate", 75, 71.7],
		["light", "light-l0 swatch-on-bg", "red", 75, 74.7],
		["light", "light-l0 swatch", "cerise-red", 75, 72.3],
		["light", "light-l0 swatch", "cinnabar", 75, 72.2],
		["light", "light-l1 swatch-on-bg", "cerise-red", 75, 64.7],
		["light", "light-l1 swatch-on-bg", "cinnabar", 75, 64.6],
		["light", "light-l1 swatch-on-bg", "pomegranate", 75, 69.5],
		["light", "light-l1 swatch-on-bg", "red", 75, 72.4],
		["light", "light-l1 swatch", "cerise-red", 75, 70.3],
		["light", "light-l1 swatch", "cinnabar", 75, 70.2],
		["light", "light-l1 swatch", "pomegranate", 75, 74.5],
		["light", "light-l2 swatch-on-bg", "cerise-red", 75, 63.1],
		["light", "light-l2 swatch-on-bg", "cinnabar", 75, 62.9],
		["light", "light-l2 swatch-on-bg", "pomegranate", 75, 67.8],
		["light", "light-l2 swatch-on-bg", "red", 75, 70.7],
		["light", "light-l2 swatch", "cerise-red", 75, 68.8],
		["light", "light-l2 swatch", "cinnabar", 75, 68.6],
		["light", "light-l2 swatch", "pomegranate", 75, 72.9],
		["light", "light-l3 swatch-on-bg", "cerise-red", 75, 61.9],
		["light", "light-l3 swatch-on-bg", "cinnabar", 75, 61.7],
		["light", "light-l3 swatch-on-bg", "pomegranate", 75, 66.5],
		["light", "light-l3 swatch-on-bg", "red", 75, 69.4],
		["light", "light-l3 swatch", "cerise-red", 75, 67.7],
		["light", "light-l3 swatch", "cinnabar", 75, 67.5],
		["light", "light-l3 swatch", "pomegranate", 75, 71.7],
		["light", "light-l3 swatch", "red", 75, 74.2],
		["light", "light-l4 swatch-on-bg", "cerise-red", 75, 61.1],
		["light", "light-l4 swatch-on-bg", "cinnabar", 75, 60.9],
		["light", "light-l4 swatch-on-bg", "pomegranate", 75, 65.7],
		["light", "light-l4 swatch-on-bg", "red", 75, 68.5],
		["light", "light-l4 swatch", "cerise-red", 75, 66.9],
		["light", "light-l4 swatch", "cinnabar", 75, 66.8],
		["light", "light-l4 swatch", "pomegranate", 75, 71],
		["light", "light-l4 swatch", "red", 75, 73.4],
		["light", "light-l5 swatch-on-bg", "cerise-red", 75, 60.3],
		["light", "light-l5 swatch-on-bg", "cinnabar", 75, 60.1],
		["light", "light-l5 swatch-on-bg", "pomegranate", 75, 64.8],
		["light", "light-l5 swatch-on-bg", "red", 75, 67.7],
		["light", "light-l5 swatch", "cerise-red", 75, 66.2],
		["light", "light-l5 swatch", "cinnabar", 75, 66],
		["light", "light-l5 swatch", "pomegranate", 75, 70.2],
		["light", "light-l5 swatch", "red", 75, 72.6],
	],
};

const apcaPair = (path, { tag, classes }) => {
	const shade = classes.find((c) => c.startsWith("shade-"))?.slice(6);
	if (shade) {
		return [
			path,
			shade.split("-")[0],
			`${shade} ${classes[0]}`,
			classes.find((c) => c.startsWith("palette-")).slice(8),
		];
	}
	return [
		path,
		classes.find((c) => c.startsWith("scheme-"))?.slice(7) ?? "page",
		[
			classes.find((c) => c.startsWith("contrast-")),
			classes.find((c) => c.startsWith("level-")),
			tag,
		]
			.filter(Boolean)
			.join(" "),
		tag,
	];
};

const contrastRules = (path, browserName, forcedColors) => {
	if (apcaPaths.has(path)) {
		test.info().annotations.push({
			type: "skip",
			description:
				"contrast checks: tokens tuned with APCA; checked by the APCA test",
		});
		return ["color-contrast", "color-contrast-enhanced"];
	}
	return forcedColors ? forcedColorsDisabledRules(browserName) : [];
};

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
			test(`axe audit — ${name}`, async ({ page, browserName }) => {
				await page.emulateMedia(media);
				await page.goto(path);
				await page.waitForLoadState("domcontentloaded");
				await expectNoAxeViolations(
					page,
					contrastRules(path, browserName, media.forcedColors),
				);
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
			await expectNoAxeViolations(page, contrastRules(path, browserName));
		});

		if (apcaPaths.has(path)) {
			for (const colorScheme of ["light", "dark"]) {
				test(`APCA Bronze — text meets Lc 45/60/75/90 for its size and weight (${colorScheme})`, async ({
					page,
				}) => {
					await page.emulateMedia({ colorScheme });
					await page.goto(path);
					await page.waitForLoadState("domcontentloaded");
					const known = new Map(
						apcaExceptions[path].map(
							([scheme, token, hue, required, measured]) => [
								[path, scheme, token, hue].join(" | "),
								{ required, measured },
							],
						),
					);
					test.info().annotations.push({
						type: "known APCA exceptions",
						description: [...known]
							.map(
								([key, { required, measured }]) =>
									`${key} | Lc ${measured} < ${required}`,
							)
							.join("\n"),
					});
					const { pairs, failures } = await apcaBronzeFailures(page);
					expect(pairs).toBeGreaterThan(0);
					const failing = new Map(
						failures.map((failure) => [
							apcaPair(path, failure).join(" | "),
							failure,
						]),
					);
					const unexpected = [...failing]
						.filter(([key]) => !known.has(key))
						.map(
							([key, { lc, minimum }]) =>
								`${key} | Lc ${lc.toFixed(1)} < ${minimum}`,
						);
					const changed = [...failing]
						.filter(([key, { lc, minimum }]) => {
							const entry = known.get(key);
							return (
								entry &&
								(entry.required !== minimum ||
									Math.abs(entry.measured - lc) > 0.5)
							);
						})
						.map(
							([key, { lc, minimum }]) =>
								`${key} | now Lc ${lc.toFixed(1)} < ${minimum}`,
						);
					const nowPassing = [...known.keys()].filter(
						(key) => !failing.has(key),
					);
					expect.soft(unexpected, "new APCA failures").toEqual([]);
					expect
						.soft(changed, "known exceptions with a changed Lc")
						.toEqual([]);
					expect(nowPassing, "known exceptions that now pass").toEqual([]);
				});
			}
		}

		test("WCAG 2.2 AA 1.4.10 Reflow — no horizontal overflow at 320px viewport", async ({
			page,
		}) => {
			await page.setViewportSize({ width: 320, height: 480 });
			await page.goto(path);
			await page.waitForLoadState("domcontentloaded");
			expect(
				await page.evaluate(
					() =>
						document.documentElement.scrollWidth -
						document.documentElement.clientWidth,
				),
			).toBeLessThanOrEqual(1);
		});
	});
}
