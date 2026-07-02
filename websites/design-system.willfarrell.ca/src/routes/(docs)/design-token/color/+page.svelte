<script>
import Codeblock from "@design-system/components/Codeblock.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import FieldOption from "@design-system/components/FieldOption.svelte";
import Fieldset from "@design-system/components/Fieldset.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import InputCheckbox from "@design-system/components/InputCheckbox.svelte";
import InputSelect from "@design-system/components/InputSelect.svelte";
import NavScrollspy from "@design-system/components/NavScrollspy.svelte";
import A from "@design-system/elements/a.svelte";
import Button from "@design-system/elements/button.svelte";
import Del from "@design-system/elements/del.svelte";
import Div from "@design-system/elements/div.svelte";
import Form from "@design-system/elements/form.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import Ins from "@design-system/elements/ins.svelte";
import Li from "@design-system/elements/li.svelte";
import Main from "@design-system/elements/main.svelte";
import Mark from "@design-system/elements/mark.svelte";
import P from "@design-system/elements/p.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Strong from "@design-system/elements/strong.svelte";
import Ul from "@design-system/elements/ul.svelte";
import { APCAcontrast, fontLookupAPCA, sRGBtoY } from "apca-w3";
import chroma from "chroma-js";
import { colorParsley } from "colorparsley";
import { page } from "$app/state";

/*
	GOAL

	Text 10:1 (Lc 90)
	Button 7:1 (Lc 75)
	Shades 1.5:1 (Lc >30)


	*/

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

const prefersContrastMap = {
	background: 10,
	less: 45, // WCAG 3:1
	"no-preference": 60, // WCAG 4.5:1
	more: 75, // WCAG 7:1
};

const wcag3Contrast = (fg, bg) => {
	return APCAcontrast(sRGBtoY(colorParsley(fg)), sRGBtoY(colorParsley(bg)));
};

/*const baseShadeLight = { hex: '#000000', lightness: 100, direction: -1 };
	const baseShadeDark = { hex: '#000000', lightness: 11.76, direction: 1 };
	const baseShade = { hex: '#6a4ab7', lightness: 0 };

	const findMinContrast = (
		backgroundHex,
		forgroundHex,
		lightness,
		prefersColorScheme = 'light',
		prefersContrast = 'background'
	) => {
		const direction = prefersColorScheme === 'light' ? -1 : 1;
		console.log('findMinContrast', {
			backgroundHex,
			forgroundHex,
			lightness,
			prefersColorScheme,
			prefersContrast,
			direction
		});
		const backgroundColor = chroma(backgroundHex).set('hcl.l', lightness);
		let forgroundColor = chroma(forgroundHex).set('hcl.l', lightness);

		let lightnessContrast = 0;
		while (lightnessContrast < prefersContrastMap[prefersContrast] ?? 30) {
			lightnessContrast = Math.abs(wcag3Contrast(backgroundColor.hex(), forgroundColor.hex()));
			const lightnessUpdate = (forgroundColor.get('lch.l') + 0.01 * direction).toFixed(2);
			//console.log(forgroundColor.get('lch.l'), '=>', lightnessUpdate);
			forgroundColor = forgroundColor.set('hcl.l', lightnessUpdate);
			//console.log(forgroundColor.hex());
			if (lightnessUpdate >= 100) break;
		}
		return forgroundColor;
	};

	const layerColor = {
		light: {},
		dark: {}
	};
	const buttonColor = {
		light: {},
		dark: {}
	};
	for (const prefersColorScheme of ['light', 'dark']) {
		layerColor[prefersColorScheme][0] = chroma('#000000').set(
			'hcl.l',
			prefersColorScheme === 'light' ? baseShadeLight.lightness : baseShadeDark.lightness
		);
		for (let i = 0, l = 5; i < l; i++) {
			layerColor[prefersColorScheme][i + 1] = findMinContrast(
				layerColor[prefersColorScheme][i].hex(),
				layerColor[prefersColorScheme][i].hex(),
				layerColor[prefersColorScheme][i].get('hcl.l'),
				prefersColorScheme
			);
		}
		for (const prefersContrast of ['less', 'no-preference', 'more']) {
			buttonColor[prefersColorScheme][prefersContrast] = findMinContrast(
				layerColor[prefersColorScheme]['0'].hex(),
				baseShade.hex,
				layerColor[prefersColorScheme]['0'].get('hcl.l'),
				prefersColorScheme,
				prefersContrast
			);
		}
	}*/

const shadeLinkLight = 89.56; // a#
const shadeButtonLight = 79.47; // 79.47
const shadeButtonDark = 44.91; // b#
const shadeLinkDark = 29.64; // a#
const shadeLinkStep = 9 / 0.16;
const shadeButtonStep = 9 / 0.16;

const shades = {
	"light-l0": 100,
	"light-l1": 98.18,
	"light-l2": 96.78,
	"light-l3": 95.69,
	"light-l4": 95.28, // deprecate?
	"light-l5": 94.53, // deprecate?

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

	"dark-l5": 24.34, // deprecate?
	"dark-l4": 22.53, // deprecate?
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

const wcag3FontWeightSize = (contrast) => {
	const fontSizeLookup = fontLookupAPCA(contrast);
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
	return wcag3Pass(contrast, size, weight) ? "✓" : `${contrast.toFixed(2)}`;
};

const wcagCalculateTextGrade = (backgroundColor, color, size, weight) => {
	// console.log({backgroundColor, color, size, weight})
	const lightnessContrast = Math.abs(wcag3Contrast(color, backgroundColor));
	// console.log({contrast})
	const weightSizes = wcag3FontWeightSize(lightnessContrast);
	// console.log({weightSizes})
	const pass = weightSizes[weight] < size;
	// console.log({pass})
	if (!pass) {
		/*console.error('wcagCalculateTextGrade', {
				pass,
				backgroundColor,
				color,
				size,
				weight,
				lightnessContrast,
				weightSizes
			});*/
	}
	return pass
		? `✓ ${lightnessContrast.toFixed(2)}`
		: `✗ ${lightnessContrast.toFixed(2)}`;
};

const wcagCalculateFillGrade = (
	backgroundColor,
	color,
	prefersContrast = "more",
) => {
	// console.log({backgroundColor, color, size, weight})
	const lightnessContrast = Math.abs(wcag3Contrast(color, backgroundColor));
	const pass = lightnessContrast >= prefersContrastMap[prefersContrast];
	// console.log({pass})
	if (!pass) {
		/*console.error('wcagCalculateFillGrade', {
				pass,
				backgroundColor,
				color,
				prefersContrast,
				lightnessContrast
				});*/
	}
	return pass
		? `✓ ${lightnessContrast.toFixed(2)}`
		: `✗ ${lightnessContrast.toFixed(2)}`;
};

const paletteNeutral = makePalette(shades, "#000000", 0, false);
processPalette(paletteNeutral);

const palettes = {
	neutral: { key: "neutral", ...paletteNeutral },
};
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
	palettes[key] = { key, ...swatch };
}
// console.log(palettes)
// const auditMode = page.url.searchParams.get("audit") === "contrast";
// const userPalette = {
// 	bg: page.url.searchParams.get("bg") ?? "neutral",
// 	text: page.url.searchParams.get("text") ?? "neutral",
// 	main: page.url.searchParams.get("main") ?? "daisy-bush",
// 	focus: page.url.searchParams.get("focus") ?? "daisy-bush",
// 	ins: page.url.searchParams.get("ins") ?? "sushi",
// 	del: page.url.searchParams.get("del") ?? "cinnabar",
// 	mark: page.url.searchParams.get("mark") ?? "bright-yellow",
// 	info: page.url.searchParams.get("info") ?? "cornflower-blue",
// 	pass: page.url.searchParams.get("pass") ?? "apple",
// 	warn: page.url.searchParams.get("warn") ?? "selective-yellow",
// 	//fail: page.url.searchParams.get('fail') ?? 'red',
// 	"fail-light": page.url.searchParams.get("fail-light") ?? "red",
// 	"fail-dark": page.url.searchParams.get("fail-dark") ?? "cerise-red",
// };
const auditMode = false;
const userPalette = {
	bg: "neutral",
	text: "neutral",
	main: "daisy-bush",
	focus: "daisy-bush",
	ins: "sushi",
	del: "cinnabar",
	mark: "bright-yellow",
	info: "cornflower-blue",
	pass: "apple",
	warn: "selective-yellow",
	fail: "red",
	"fail-light": "red",
	"fail-dark": "cerise-red",
};

const cssVariables = {
	light: {
		l0: palettes[userPalette.bg]["light-l0"].color,
		l1: palettes[userPalette.bg]["light-l1"].color,
		l2: palettes[userPalette.bg]["light-l2"].color,
		l3: palettes[userPalette.bg]["light-l3"].color,
		l4: palettes[userPalette.bg]["light-l4"].color,
		l5: palettes[userPalette.bg]["light-l5"].color,
		text: palettes[userPalette.text]["dark-l0"].color,
		"fill-text": palettes[userPalette.text]["light-l1"].color,

		main: palettes[userPalette.main]["light-a0"].color,
		"main-pseudo": palettes[userPalette.main]["dark-a0"].color,
		"main-bold": palettes[userPalette.main]["light-b0"].color,
		"main-bold-pseudo": palettes[userPalette.main]["dark-b0"].color,
		//'main-text': palettes[userPalette.main]['light-l1'].color,

		focus: palettes[userPalette.focus]["light-a0"].color,
		ins: palettes[userPalette.ins]["light-a0"].color,
		del: palettes[userPalette.del]["light-a0"].color,
		mark: palettes[userPalette.mark]["light-a0"].color,

		info: palettes[userPalette.info]["light-b0"].color,
		pass: palettes[userPalette.pass]["light-b0"].color,
		warn: palettes[userPalette.warn]["light-b0"].color,
		fail: palettes[userPalette.fail]["light-b0"].color,
	},
	dark: {
		l0: palettes[userPalette.bg]["dark-l0"].color,
		l1: palettes[userPalette.bg]["dark-l1"].color,
		l2: palettes[userPalette.bg]["dark-l2"].color,
		l3: palettes[userPalette.bg]["dark-l3"].color,
		l4: palettes[userPalette.bg]["dark-l4"].color,
		l5: palettes[userPalette.bg]["dark-l5"].color,
		text: palettes[userPalette.text]["light-l1"].color,
		"fill-text": palettes[userPalette.text]["dark-l0"].color,

		main: palettes[userPalette.main]["dark-a0"].color,
		"main-pseudo": palettes[userPalette.main]["light-a0"].color,
		"main-bold": palettes[userPalette.main]["dark-b0"].color,
		"main-bold-pseudo": palettes[userPalette.main]["light-b0"].color,
		//'main-text': palettes[userPalette.main]['dark-l0'].color,

		focus: palettes[userPalette.focus]["dark-a0"].color,
		ins: palettes[userPalette.ins]["dark-a0"].color,
		del: palettes[userPalette.del]["dark-a0"].color,
		mark: palettes[userPalette.mark]["dark-a0"].color,

		info: palettes[userPalette.info]["dark-b0"].color,
		pass: palettes[userPalette.pass]["dark-b0"].color,
		warn: palettes[userPalette.warn]["dark-b0"].color,
		fail: palettes[userPalette.fail]["dark-b0"].color,
	},
};

const makeCSSVariables = (prefersColorSchema, prefersContrast) => {
	// console.log(
	// 	'makeCSSVariables',
	// 	{ prefersColorSchema, prefersContrast },
	// 	cssVariables[prefersColorSchema]
	// );
	let css = "";
	for (const key in cssVariables[prefersColorSchema]) {
		css += `  --color-${key}: ${cssVariables[prefersColorSchema][key]};\n`;
	}
	return css;
};

const page_ = {
	group: "Design tokens",
	title: "Colour roles",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page_.title} | {page_.group} | Design System</title>
	<meta name="description" content="Colour role builder for the semantic fluid design system" />
</svelte:head>

<Main id="main">
	<Hgroup>
		<HSub>{page_.group}</HSub>
		<H1>{page_.title}</H1>
		<HSub><Small>Published on <DataTime datetime={page_.update} /></Small></HSub>
	</Hgroup>
	<Section>
		<Form class="grid">
			<InputSelect id="main" label="Primary" value={userPalette.main}>
				{#each Object.keys(palettes) as key}
					<FieldOption label={key} value={key} selected={key === userPalette.main} />
				{/each}
			</InputSelect>

			<InputSelect id="focus" label="Focus ring" value={userPalette.focus}>
				{#each Object.keys(palettes) as key}
					<FieldOption label={key} value={key} selected={key === userPalette.focus} />
				{/each}
			</InputSelect>

			<InputSelect id="bg" label="Background" value={userPalette.bg}>
				{#each Object.keys(palettes) as key}
					<FieldOption label={key} value={key} selected={key === userPalette.bg} />
				{/each}
			</InputSelect>

			<InputSelect id="text" label="Text" value={userPalette.text}>
				{#each Object.keys(palettes) as key}
					<FieldOption label={key} value={key} selected={key === userPalette.text} />
				{/each}
			</InputSelect>

			<InputSelect id="info" label="Status: Info" value={userPalette.info}>
				{#each Object.keys(palettes) as key}
					<FieldOption label={key} value={key} selected={key === userPalette.info} />
				{/each}
			</InputSelect>
			<InputSelect id="fail" label="Status: Fail/Danger/Error" value={userPalette.fail}>
				{#each Object.keys(palettes) as key}
					<FieldOption label={key} value={key} selected={key === userPalette.fail} />
				{/each}
			</InputSelect>

			<InputSelect id="ins" label="<ins>" value={userPalette.ins}>
				{#each Object.keys(palettes) as key}
					<FieldOption label={key} value={key} selected={key === userPalette.ins} />
				{/each}
			</InputSelect>
			<InputSelect id="del" label="<del>" value={userPalette.del}>
				{#each Object.keys(palettes) as key}
					<FieldOption label={key} value={key} selected={key === userPalette.del} />
				{/each}
			</InputSelect>
			<InputSelect id="mark" label="<mark>" value={userPalette.mark}>
				{#each Object.keys(palettes) as key}
					<FieldOption label={key} value={key} selected={key === userPalette.mark} />
				{/each}
			</InputSelect>
			<Fieldset id="audit" label="Auditor options" value={[auditMode]}>
				<InputCheckbox label="Contract values" value="contrast" />
			</Fieldset>
			<Div><Button>Submit</Button></Div>
		</Form>
	</Section>
	<!--{#each ['light', 'dark'] as prefersColorScheme}
		<Section>
			<Hgroup>
				<HSub><Small>prefers-color-scheme</Small></HSub>
				<H2>{prefersColorScheme} (POC)</H2>
			</Hgroup>

			<Div class="grid">
				{#each ['less', 'no-preference', 'more'] as prefersContrast}
					<Div>
						<Hgroup>
							<HSub><Small>prefers-contrast</Small></HSub>
							<H3>{prefersContrast} (POC)</H3>
						</Hgroup>
						<Div
							class="window"
							style="{makeCSSVariables(prefersColorScheme)} --color-bg: var(--color-l0);"
						>
							{#each [0, 1, 2, 3, 4, 5] as level}
								<Div
									class="window"
									style="--color-bg: {layerColor[prefersColorScheme][level].hex()};"
								>
									{#if auditMode}
										<Ul class="force-text-color">
											<Li
												><Strong>text:</Strong>
												{cssVariables[prefersColorScheme].l0}
												{cssVariables[prefersColorScheme][`l${level}`]}
												{wcagCalculateFillGrade(
													cssVariables[prefersColorScheme].l0,
													cssVariables[prefersColorScheme][`l${level}`],
													'background'
												)}</Li
											>
											<Li
												><Strong>text:</Strong>
												{wcagCalculateTextGrade(
													cssVariables[prefersColorScheme][`l${level}`],
													cssVariables[prefersColorScheme].text,
													18,
													400
												)}</Li
											>
										</Ul>
									{/if}
									<Div
										class="group"
										style="--color-main-bold: {buttonColor[prefersColorScheme][
											prefersContrast
										].hex()}"
									>
										<Button>button</Button>
									</Div>
								</Div>
							{/each}
						</Div>
					</Div>
				{/each}
			</Div>
		</Section>
	{/each}-->
	{#each ['light', 'dark'] as prefersColorScheme}
		<Section>
			<Hgroup>
				<HSub><Small>prefers-color-scheme</Small></HSub>
				<H2>{prefersColorScheme}</H2>
			</Hgroup>

			<Div class="grid">
				{#each ['less', 'no-preference', 'more'] as prefersContrast}
					<Div>
						<Hgroup>
							<HSub><Small>prefers-contrast</Small></HSub>
							<H3>{prefersContrast}</H3>
						</Hgroup>
						<Div
							class="window"
							style="{makeCSSVariables(prefersColorScheme)} --color-bg: var(--color-l0);"
						>
							{#each [0, 1, 2, 3, 4, 5] as level}
								<Div class="window" style="--color-bg: var(--color-l{level});">
									{#if auditMode}
										<Ul class="force-text-color">
											{#if level}
												<Li
													><Strong>background:</Strong>
													{cssVariables[prefersColorScheme].l0}
													{cssVariables[prefersColorScheme][`l${level}`]}
													{wcagCalculateFillGrade(
														cssVariables[prefersColorScheme].l0,
														cssVariables[prefersColorScheme][`l${level}`],
														'background'
													)}</Li
												>
											{/if}
											<Li
												><Strong>text:</Strong>
												{wcagCalculateTextGrade(
													cssVariables[prefersColorScheme][`l${level}`],
													cssVariables[prefersColorScheme].text,
													18,
													400,
													prefersContrast
												)}</Li
											>
											<Li
												><Strong>strong:</Strong>
												{wcagCalculateTextGrade(
													cssVariables[prefersColorScheme][`l${level}`],
													cssVariables[prefersColorScheme].text,
													18,
													700,
													prefersContrast
												)}</Li
											>
											<Li
												><Strong>link:</Strong>
												{wcagCalculateTextGrade(
													cssVariables[prefersColorScheme][`l${level}`],
													cssVariables[prefersColorScheme].main,
													18,
													400,
													prefersContrast
												)}</Li
											>
											<Li
												><Strong>inserted:</Strong>
												{wcagCalculateTextGrade(
													cssVariables[prefersColorScheme][`l${level}`],
													cssVariables[prefersColorScheme].ins,
													18,
													400,
													prefersContrast
												)}</Li
											>
											<Li
												><Strong>deleted:</Strong>
												{wcagCalculateTextGrade(
													cssVariables[prefersColorScheme][`l${level}`],
													cssVariables[prefersColorScheme].del,
													18,
													400,
													prefersContrast
												)}</Li
											>
											<Li
												><Strong>highlighted (fill):</Strong>
												{wcagCalculateFillGrade(
													cssVariables[prefersColorScheme][`l${level}`],
													cssVariables[prefersColorScheme].mark,
													'more'
												)}</Li
											>
											<Li
												><Strong>highlighted (text):</Strong>
												{wcagCalculateTextGrade(
													cssVariables[prefersColorScheme].mark,
													cssVariables[prefersColorScheme]['fill-text'],
													18,
													400,
													prefersContrast
												)}</Li
											>
											<Li
												><Strong>button (focus):</Strong>
												{wcagCalculateTextGrade(
													cssVariables[prefersColorScheme][`l${level}`],
													cssVariables[prefersColorScheme].main,
													18,
													700,
													prefersContrast
												)}</Li
											>
											<Li
												><Strong>button (fill):</Strong>
												{wcagCalculateFillGrade(
													cssVariables[prefersColorScheme][`l${level}`],
													cssVariables[prefersColorScheme].main,
													'more'
												)}</Li
											>
											<Li
												><Strong>button (text):</Strong>
												{wcagCalculateTextGrade(
													cssVariables[prefersColorScheme].main,
													cssVariables[prefersColorScheme]['fill-text'],
													18,
													700,
													prefersContrast
												)}</Li
											>
										</Ul>
									{/if}

									<P class="force-text-color"
										>text <A href="#">link</A>
										<Strong>bold</Strong>
										<Ins>inserted</Ins>
										<Del>deleted</Del>
										<Mark>highlighted</Mark></P
									>
									<Div class="group">
										<Button>button</Button>
									</Div>
								</Div>
							{/each}
						</Div>
					</Div>
				{/each}
			</Div>
		</Section>
	{/each}
	<Section>
		<H2>theme.css</H2>
		<Codeblock
			language="css"
			code={`
:root {
	${makeCSSVariables('light', 'no-preference')}
	@media (prefers-contrast: less) {
	}
	@media (prefers-contrast: more) {
	}
	@media (prefers-color-scheme: dark) {
		${makeCSSVariables('dark', 'no-preference')}
		@media (prefers-contrast: less) {
		}
		@media (prefers-contrast: more) {
		}
	}
}

`}
		/>

		Source: https://gka.github.io/palettes/#/12|s|ffffff,0000ee,000000||1|0
		https://accessiblepalette.com/ https://www.myndex.com/APCA/ https://contrast.tools/
	</Section>
	<Section>
		<H2>References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2023/12/be-careful-using-prefers-color-scheme.html">Be Careful Using prefers-color-scheme</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2022/06/dont-override-windows-high-contrast-mode.html">Don't Override Windows High Contrast Mode</A> — Adrian Roselli</Li>
			<Li><A href="https://www.myndex.com/APCA/">APCA Contrast Calculator</A></Li>
		</Ul>
	</Section>
</Main>

<style global>
	.window {
				margin: 0.5rem;
				padding: 1rem;
				border-radius: 0.5rem;
				background-color: var(--color-bg);
			}
			/* So browser bug when mixing root, theme, and style override */
			.force-text-color {
				color: var(--color-text);
			}
</style>
