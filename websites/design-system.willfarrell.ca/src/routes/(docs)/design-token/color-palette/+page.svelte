<script>
import Snippet from "@components/Snippet.svelte";
import Codeblock from "@design-system/components/Codeblock.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import Table from "@design-system/components/Table.svelte";
import A from "@design-system/elements/a.svelte";
import Div from "@design-system/elements/div.svelte";
import Footer from "@design-system/elements/footer.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import Li from "@design-system/elements/li.svelte";
import Main from "@design-system/elements/main.svelte";
import Nav from "@design-system/elements/nav.svelte";
import P from "@design-system/elements/p.svelte";
import Small from "@design-system/elements/small.svelte";
import Ul from "@design-system/elements/ul.svelte";
import { APCAcontrast, fontLookupAPCA, sRGBtoY } from "apca-w3";
import chroma from "chroma-js";
import { colorParsley } from "colorparsley";

// Light: text 30 on 100
// Color: text 100 on 40
// Color: text 0 on 90
// Dark: text 90 on 5

// level 0 = 0dp - bg
// level 1 = 1dp - card/modal
// level 2 = 3dp - navs
// level 3 = 6dp - button
// level 4 = 8dp
// level 5 = 12dp

const shadeLinkLight = 89.56; // 89.56
const shadeButtonLight = 79.47; // 79.47
const shadeButtonDark = 44.91;
const shadeLinkDark = 29.64;
const shadeLinkStep = 9 / 0.16;
const shadeButtonStep = 9 / 0.16;

const shades = {
	"light-l0": 100,
	"light-l1": 98.18,
	"light-l2": 96.78,
	"light-l3": 95.69,
	"light-l4": 95.28,
	"light-l5": 94.53,

	"dark-a0": shadeLinkLight,
	"dark-a8": shadeLinkLight - shadeLinkStep * 0.08,
	"dark-a12": shadeLinkLight - shadeLinkStep * 0.12,
	"dark-a16": shadeLinkLight - shadeLinkStep * 0.16,

	"dark-b0": shadeButtonLight,
	"dark-b8": shadeButtonLight - shadeButtonStep * 0.08,
	"dark-b12": shadeButtonLight - shadeButtonStep * 0.12,
	"dark-b16": shadeButtonLight - shadeButtonStep * 0.16,

	main: 50,

	"light-b16": shadeButtonDark + shadeButtonStep * 0.16,
	"light-b12": shadeButtonDark + shadeButtonStep * 0.12,
	"light-b8": shadeButtonDark + shadeButtonStep * 0.08,
	"light-b0": shadeButtonDark,

	"light-a16": shadeLinkDark + shadeLinkStep * 0.16,
	"light-a12": shadeLinkDark + shadeLinkStep * 0.12,
	"light-a8": shadeLinkDark + shadeLinkStep * 0.08,
	"light-a0": shadeLinkDark,

	"dark-l5": 24.34,
	"dark-l4": 22.53,
	"dark-l3": 21.72,
	"dark-l2": 19.26,
	"dark-l1": 16.51,
	"dark-l0": 11.76,
};

const getColorFromScale = (scale, lightness) => {
	const color = scale(lightness / 100);
	return chroma(color);
};

const applyHueCorrection = (chromaColor, hueCorrection, index) => {
	const totalShades = Object.keys(shades).length;
	const hueAdjustment = (hueCorrection / totalShades) * (index + 1);
	return chromaColor.set("lch.h", chromaColor.lch()[2] + hueAdjustment);
};

const hexToRgb = (hex) =>
	hex
		.replace(
			/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
			(m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`,
		)
		.substring(1)
		.match(/.{2}/g)
		.map((x) => Number.parseInt(x, 16));

const makePalette = (shades, color, hueCorrection = 0, isLab = false) => {
	const scale = chroma
		.scale(["black", color, "white"])
		.mode(isLab ? "lab" : "rgb")
		.correctLightness();

	const palette = {};
	Object.keys(shades).forEach((shade, lightnessIndex) => {
		const lightness = shades[shade];
		const chromaColorWithLightness = getColorFromScale(scale, lightness);
		const chromaColorWithCorrectedHue = applyHueCorrection(
			chromaColorWithLightness,
			hueCorrection,
			lightnessIndex,
		);
		const colorHex = chromaColorWithCorrectedHue.hex();
		palette[shade] = { color: colorHex };
	});
	return palette;
};

const processPalette = (palette) => {
	for (const shade in palette) {
		// wcag3Contrast(foreground, background)
		const color = palette[shade].color;
		const colorRGB = hexToRgb(color).join(", ");
		// link text on light/dark mode background
		const colorOnLightLc = Math.abs(
			wcag3Contrast(color, paletteNeutral["light-l5"].color),
		);
		const colorOnDarkLc = Math.abs(
			wcag3Contrast(color, paletteNeutral["dark-l5"].color),
		);
		// text on shade color
		const darkOnColorLc = Math.abs(
			wcag3Contrast(paletteNeutral["dark-l0"].color, color),
		);
		const lightOnColorLc = Math.abs(
			wcag3Contrast(paletteNeutral["light-l1"].color, color),
		);
		const textColorLc =
			darkOnColorLc < lightOnColorLc ? lightOnColorLc : darkOnColorLc;
		const textColor =
			darkOnColorLc < lightOnColorLc
				? paletteNeutral["light-l1"].color
				: paletteNeutral["dark-l0"].color;
		palette[shade] = {
			color,
			colorRGB,
			textColor,
			colorOnLightLc,
			darkOnColorLc,
			lightOnColorLc,
			textColorLc,
			colorOnDarkLc,
		};
	}
};

const wcag3Contrast = (fg, bg) => {
	const contrast = APCAcontrast(
		sRGBtoY(colorParsley(fg)),
		sRGBtoY(colorParsley(bg)),
	);
	return contrast;
};
const wcag3FontWeightSize = (contract) => {
	const fontSizeLookup = fontLookupAPCA(contract);
	fontSizeLookup.shift();
	const weights = {};
	for (let i = 0, l = fontSizeLookup.length; i < l; i++) {
		const size = fontSizeLookup[i];
		weights[i * 100] = size;
	}
	return weights;
};
const wcag3Pass = (contrast, size = 16, weight = 400) => {
	const weightSizes = wcag3FontWeightSize(contrast);
	return weightSizes[weight] < size;
};
const wcag3PassMark = (contrast, size, weight) => {
	return wcag3Pass(contrast, size, weight) ? "✓" : Math.floor(contrast);
};

const paletteNeutral = makePalette(shades, "#777777", 0, false);
processPalette(paletteNeutral);

const palettles = [{ key: "neutral", ...paletteNeutral }];
const colors = {
	red: "#cd4b3f",
	"cerise-red": "#dc306f",
	cinnabar: "#dd3733",
	pomegranate: "#d4461a",
	pizazz: "#b26300",
	"selective-yellow": "#9d6e00",
	"bright-yellow": "#8a761d",
	"key-lime-pie": "#767c1f",
	sushi: "#5a8230",
	apple: "#38873c",
	"elf-green": "#008678",
	pelorous: "#008393",
	"curious-blue": "#027eba",
	"cornflower-blue": "#1b7acd",
	cobalt: "#6572be",
	"daisy-bush": "#8566c4",
	"violet-eggplant": "#a755bd",
};
for (const key in colors) {
	const swatch = makePalette(shades, colors[key], 0, false);
	processPalette(swatch);
	palettles.push({ key, ...swatch });
}

const page_ = {
	group: "Design tokens",
	title: "Colour palette",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page_.title} | {page_.group} | Design System</title>
	<meta name="description" content="Colour palette generator with APCA contrast checking for light and dark colour schemes" />
</svelte:head>

<Main id="main">
	<Hgroup>
		<HSub>{page_.group}</HSub>
		<H1>{page_.title}</H1>
		<HSub><Small>Published on <DataTime datetime={page_.update} /></Small></HSub>
	</Hgroup>
	<Ul>
		<Li>Level 0 Text on shade background - `p`, `strong`, `button`</Li>
		<Li>Shade Text on level 5 background - `a`, `mark`, `ins`, `del`, errors, labels</Li>
		<Li>Fill on level 5 background - `button`</Li>
	</Ul>
	<Ul>
		<Li>`p`: Normal text (`colorSchemeInverse-l0`) on background (`colorScheme-l*`)</Li>
		<Li>`strong`: Strong text (`colorSchemeInverse-l0`) on background (`colorScheme-l*`)</Li>
		<Li
			>`a`/`ins`/`del`/error: Shade Text (`colorSchemeInverse-a0`) (400) on background
			(`colorScheme-l*`)</Li
		>
		<Li
			>`mark`: Normal text (`colorScheme-l0`) on Shade fill (`l5`) on background (`colorScheme-l*`)</Li
		>
		<Li
			>`button`: Strong text (`colorSchemeInverse-l0`) on Shade fill (`b0`) on background
			(`colorScheme-l*`)</Li
		>
		<Li
			>label: Normal text (`colorScheme-l0`) on Shade fill (`l5`) on background (`colorScheme-l*`)</Li
		>
	</Ul>
	{#each palettles as palette}
		{palette.key}
		<Div class="palette">
			{#each Object.keys(shades) as shade}
				<Div>
					{shade} ({shades[shade].toFixed(2)}) {palette[shade].color}
					{#if shade.includes('-b')}
						<Div
							class="preview"
							style="background-color: {palette[shade].color}; color: {palette[shade]
								.textColor}; font-weight:700"
						>
							{wcag3PassMark(palette[shade].textColorLc, 18, 700)}
						</Div>
					{:else}
						<Div
							class="preview"
							style="background-color: {palette[shade].color}; color: {palette[shade].textColor}"
						>
							{wcag3PassMark(palette[shade].textColorLc, 18, 400)}
						</Div>
					{/if}

					{#if shade.includes('light-l') || shade.includes('dark-a') || shade.includes('dark-b')}
						{#if shade.includes('-b')}
							<Div
								class="preview"
								style="background-color: {palette['dark-l5'].color}; color: {palette[shade]
									.color}; font-weight:700"
							>
								{wcag3PassMark(palette[shade].colorOnDarkLc, 18, 700)}
							</Div>
						{:else}
							<Div
								class="preview"
								style="background-color: {palette['dark-l5'].color}; color: {palette[shade].color}"
							>
								{wcag3PassMark(palette[shade].colorOnDarkLc, 18, 400)}
							</Div>
						{/if}
						<!-- <Div
							class="preview"
							style="background-color: {palette['dark-l5'].color}; color: {palette[shade].color}"
						>
							{wcag3PassMark(palette[shade].colorOnDarkLc, 18, 400)}
						</Div>
						<Div
							class="preview"
							style="background-color: {palette['dark-l5'].color}; color: {palette[shade]
								.color}; font-weight:700"
						>
							{wcag3PassMark(palette[shade].colorOnDarkLc, 18, 700)}
						</Div> -->

						<Div class="preview" style="background-color: {palette['dark-l5'].color};">
							<Div
								class="preview"
								style="background-color: {palette[shade].color}; color: {palette[shade].textColor}"
								>{wcag3PassMark(palette[shade].colorOnDarkLc, 96, 700)}</Div
							>
						</Div>
					{:else if shade.includes('dark-l') || shade.includes('light-a') || shade.includes('light-b')}
						{#if shade.includes('-b')}
							<Div
								class="preview"
								style="background-color: {palette['light-l5'].color}; color: {palette[shade]
									.color}; font-weight:700"
							>
								{wcag3PassMark(palette[shade].colorOnLightLc, 18, 700)}
							</Div>
						{:else}
							<Div
								class="preview"
								style="background-color: {palette['light-l5'].color}; color: {palette[shade].color}"
							>
								{wcag3PassMark(palette[shade].colorOnLightLc, 18, 400)}
							</Div>
						{/if}
						<!-- <Div
							class="preview"
							style="background-color: {palette['light-l5'].color}; color: {palette[shade].color}"
						>
							{wcag3PassMark(palette[shade].colorOnLightLc, 18, 400)}
						</Div>
						<Div
							class="preview"
							style="background-color: {palette['light-l5'].color}; color: {palette[shade]
								.color}; font-weight:700"
						>
							{wcag3PassMark(palette[shade].colorOnLightLc, 18, 700)}
						</Div> -->
						<Div class="preview" style="background-color: {palette['light-l5'].color};">
							<Div
								class="preview"
								style="background-color: {palette[shade].color}; color: {palette[shade].textColor}"
								>{wcag3PassMark(palette[shade].colorOnLightLc, 96, 700)}</Div
							>
						</Div>
					{/if}
				</Div>
			{/each}
		</Div>
	{/each}
</Main>

<style global>
	.palette {
				display: flex;
				gap: var(--gap);
				div {
					display: flex;
					flex-direction: column;
					gap: var(--gap);
				}
			}
			.preview {
				inline-size: 4rem;
				block-size: 4rem;
				padding: 1rem;
				border-radius: 1rem;
				display: flex;
				align-items: center;
				justify-content: center;

				& .preview {
					inline-size: 2rem;
					block-size: 2rem;
					padding: 0.5rem;
				}
			}
</style>
