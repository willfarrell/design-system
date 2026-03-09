<script>
import Head from "@components/Head.svelte";
import Snippet from "@components/Snippet.svelte";
import Codeblock from "@design-system/components/Codeblock.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import Table from "@design-system/components/Table.svelte";
import A from "@design-system/elements/a.svelte";
import Div from "@design-system/elements/div.svelte";
import Footer from "@design-system/elements/footer.svelte";
import Header from "@design-system/elements/header.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import Li from "@design-system/elements/li.svelte";
import Main from "@design-system/elements/main.svelte";
import Nav from "@design-system/elements/nav.svelte";
import P from "@design-system/elements/p.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Time from "@design-system/elements/time.svelte";
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

let shadeLinkLight = 89.56;
let shadeButtonLight = 79.47;
let shadeButtonDark = 44.91;
let shadeLinkDark = 29.64;
let shadeLinkStep = 9 / 0.16;
let shadeButtonStep = 9 / 0.16;

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
		.map((x) => parseInt(x, 16));

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

const paletteNeutral = makePalette(shades, "#000000", 0, false);
processPalette(paletteNeutral);

const palettles = $state({
	neutral: { key: "neutral", ...paletteNeutral },
});
const colors = {
	red: "#da3425",
	"cerise-red": "#e31c65",
	cinnabar: "#e2201d",
	pomegranate: "#f3420c",
	pizazz: "#ff8c00",
	"selective-yellow": "#ffb300",
	"bright-yellow": "#fdcf02",
	"key-lime-pie": "#c1cc33",
	sushi: "#81ba45",
	apple: "#4bb450",
	"elf-green": "#00ffe6",
	pelorous: "#00e1ff",
	"curious-blue": "#03a9fc",
	"cornflower-blue": "#1a86e5",
	cobalt: "#4051bf",
	"daisy-bush": "#693bc4",
	"violet-eggplant": "#ae2dd2",
};
for (const key in colors) {
	const swatch = makePalette(shades, colors[key], 0, false);
	processPalette(swatch);
	palettles[key] = { key, ...swatch };
}
// console.log(palettles)
</script>

<svelte:head>
	<Head>
		<title>Coulour | Design System</title>
	</Head>
</svelte:head>

{#each Object.values(palettles) as palette}
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
					<Div
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
					</Div>

					<Div class="preview" style="background-color: {palette['dark-l5'].color};">
						<Div
							class="preview"
							style="background-color: {palette[shade].color}; color: {palette[shade].textColor}"
							>{wcag3PassMark(palette[shade].colorOnDarkLc, 96, 700)}</Div
						>
					</Div>
				{:else if shade.includes('dark-l') || shade.includes('light-a') || shade.includes('light-b')}
					<Div
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
					</Div>
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
	<details>
		<summary>CSS variables</summary>
		<pre><code
				>@media (prefers-color-scheme: light)
--color-l0: {palette['light-l0'].color};
--color-l1: {palette['light-l1'].color};
--color-l2: {palette['light-l2'].color};
--color-l3: {palette['light-l3'].color};
--color-l4: {palette['light-l4'].color};
--color-l5: {palette['light-l5'].color};
--color-text: {palette['dark-l0'].color};
--color-main: {palette['light-a0'].color};
--color-main-pseudo: {palette['dark-a0'].color};
--color-main-bold: {palette['light-b0'].color};
--color-main-bold-pseudo: {palette['dark-b0'].color};
--color-main-text: {palette['dark-l0'].color};

@media (prefers-color-scheme: dark)
--color-l0: {palette['dark-l0'].color};
--color-l1: {palette['dark-l1'].color};
--color-l2: {palette['dark-l2'].color};
--color-l3: {palette['dark-l3'].color};
--color-l4: {palette['dark-l4'].color};
--color-l5: {palette['dark-l5'].color};
--color-text: {palette['light-l1'].color};
--color-main: {palette['dark-a0'].color};
--color-main-pseudo: {palette['light-a0'].color};
--color-main-bold: {palette['dark-b0'].color};
--color-main-bold-pseudo: {palette['light-b0'].color};
--color-main-text: {palette['light-l1'].color};

</code></pre>
	</details>
{/each}

<!-- Primary
	<Div class="palette">
	{#each Object.keys(shades) as shade}
		<Div>
			{shade}
			<Div class="preview" style="background-color: {palettePrimary[shade].color}; color: {palettePrimary[shade].textColor}">
				{Math.floor(palettePrimary[shade].colorLc)}{wcag3Pass(palettePrimary[shade].colorLc, 18, 400)}
			</Div>
			<Div class="preview" style="background-color: {palettePrimary[50].color}; color: {paletteBackground[shade].color}">
				{Math.floor(palettePrimary[shade].lightLc)}{wcag3Pass(palettePrimary[shade].lightLc, 18, 400)}
			</Div>
			<Div class="preview" style="background-color: {palettePrimary[950].color}; color: {palettePrimary[shade].color}">
				{Math.floor(palettePrimary[shade].darkLc)}{wcag3Pass(palettePrimary[shade].darkLc, 18, 400)}
			</Div>
			{palettePrimary[shade].color}
		</Div>
	{/each}
	</Div>
	<details>
		<summary>CSS variables</summary>
		<pre><code>{#each Object.keys(shades) as shade}--primary-{shade}: {palettePrimary[shade].color};<br/>{/each}
light
--color-l0: {palettePrimary[50].color};
--color-l1: {palettePrimary[100].color};
--color-l2: {palettePrimary[200].color};
--color-l3: {palettePrimary[300].color};
--primary-rgb: {palettePrimary[500].colorRGB};
dark
--color-l0: {palettePrimary[950].color};
--color-l1: {palettePrimary[900].color};
--color-l2: {palettePrimary[800].color};
--color-l3: {palettePrimary[700].color};
--primary-rgb: {palettePrimary[500].colorRGB};
		</code></pre>
	</details> -->

<details>
	<summary>CSS variables for code</summary>
	<pre><code
			>@media (prefers-color-scheme: light)

	--code-comment: {palettles['neutral']['light-a0'].color};
	--code-punctuation: {palettles['neutral']['light-a0'].color};
	--code-deleted: {palettles['red']['light-a0'].color};
	--code-inserted: {palettles['key-lime-pie']['light-a0'].color};
	--code-operator: {palettles['daisy-bush']['light-a0'].color};
	--code-keyword: {palettles['pelorous']['light-a0'].color};
	--code-function: {palettles['cinnabar']['light-a0'].color};
	--code-variable: {palettles['pizazz']['light-b0'].color};

	@media (prefers-color-scheme: dark)
	--code-comment: {palettles['neutral']['dark-a0'].color};
	--code-punctuation: {palettles['neutral']['dark-a0'].color};
	--code-deleted: {palettles['red']['dark-a0'].color};
	--code-inserted: {palettles['key-lime-pie']['dark-a0'].color};
	--code-operator: {palettles['daisy-bush']['dark-a0'].color};
	--code-keyword: {palettles['pelorous']['dark-a0'].color};
	--code-function: {palettles['cinnabar']['dark-a0'].color};
	--code-variable: {palettles['pizazz']['dark-b0'].color};

	</code></pre>
</details>

Source: https://gka.github.io/palettes/#/12|s|ffffff,0000ee,000000||1|0
https://accessiblepalette.com/ https://www.myndex.com/APCA/

<style>
	:global(.palette) {
		display: flex;
		gap: var(--gap);
	}
	:global(.preview) {
		inline-size: 6rem;
		block-size: 6rem;
		padding: 1rem;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;

		& .preview {
			inline-size: 3em;
			block-size: 3em;
			padding: 0.5rem;
		}
	}
</style>
