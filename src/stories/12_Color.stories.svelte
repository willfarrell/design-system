<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import {fontFamily, argTypes, text} from './lib/controls.js'
	import chroma from 'chroma-js'
	import { colorParsley } from 'colorparsley';
	import {APCAcontrast, sRGBtoY, fontLookupAPCA} from 'apca-w3'
	
	import A from '../svelte/element/a.svelte'
	import Button from '../svelte/element/button.svelte'
	import P from '../svelte/element/p.svelte'
	
	import './assets/global.css';
	
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
	
	let shadeLinkLight = 89.56
	let shadeButtonLight = 79.47
	let shadeButtonDark = 44.91
	let shadeLinkDark = 29.64
	let shadeLinkStep = 9/.16
	let shadeButtonStep = 9/.16
	
	const shades = {
		'light-l0': 100,
		'light-l1': 98.18,
		'light-l2': 96.78,
		'light-l3': 95.69,
		'light-l4': 95.28,
		'light-l5': 94.53,
		
		'dark-a0': shadeLinkLight,
		'dark-a8': shadeLinkLight - shadeLinkStep * 0.08,
		'dark-a12': shadeLinkLight - shadeLinkStep * 0.12,
		'dark-a16': shadeLinkLight - shadeLinkStep * 0.16,
		
		'dark-b0': shadeButtonLight,
		'dark-b8': shadeButtonLight - shadeButtonStep * 0.08,
		'dark-b12': shadeButtonLight - shadeButtonStep * 0.12,
		'dark-b16': shadeButtonLight - shadeButtonStep * 0.16,
		
		'light-b16': shadeButtonDark + shadeButtonStep * 0.16, 
		'light-b12': shadeButtonDark + shadeButtonStep * 0.12, 
		'light-b8': shadeButtonDark + shadeButtonStep * 0.08,
		'light-b0': shadeButtonDark,
		
		'light-a16': shadeLinkDark + shadeLinkStep * 0.16, 
		'light-a12': shadeLinkDark + shadeLinkStep * 0.12, 
		'light-a8': shadeLinkDark + shadeLinkStep * 0.08,
		'light-a0': shadeLinkDark,
		
		'dark-l5': 24.34,
		'dark-l4': 22.53,
		'dark-l3': 21.72,
		'dark-l2': 19.26,
		'dark-l1': 16.51,
		'dark-l0': 11.76
	}
	
	
	const getColorFromScale = (scale, lightness) => {
		const color = scale(lightness / 100);
		return chroma(color);
	  }
	
	  const applyHueCorrection = (chromaColor, hueCorrection, index) => {
		const totalShades = Object.keys(shades).length;
		const hueAdjustment = (hueCorrection / totalShades) * (index + 1);
		return chromaColor.set('lch.h', chromaColor.lch()[2] + hueAdjustment);
	  }
	  
	  const hexToRgb = hex =>
		hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
				   ,(m, r, g, b) => '#' + r + r + g + g + b + b)
		  .substring(1).match(/.{2}/g)
		  .map(x => parseInt(x, 16))
	  
	const makePalette = (color, hueCorrection = 0, isLab = false, shades) => {
		const scale = chroma
			.scale(['black', color, 'white'])
	  		.mode(isLab ? 'lab' : 'rgb')
	  		.correctLightness();
		
		const palette = {}
		Object.keys(shades).forEach((shade, lightnessIndex) => {
			const lightness = shades[shade]
			const chromaColorWithLightness = getColorFromScale(scale, lightness);
			const chromaColorWithCorrectedHue = applyHueCorrection(
				chromaColorWithLightness,
				hueCorrection,
				lightnessIndex
			);
			const colorHex = chromaColorWithCorrectedHue.hex();
			palette[shade] = {color: colorHex}
		})
		return palette
	}
	
	const processPalette = (palette) => {
		for (const shade in palette) {
			// wcag3Contrast(foreground, background)
			const color = palette[shade].color
			const colorRGB = hexToRgb(color).join(', ')
			// link text on light/dark mode background
			const colorOnLightLc = Math.abs(wcag3Contrast(color, paletteNeutral['light-l5'].color))
			const colorOnDarkLc = Math.abs(wcag3Contrast(color, paletteNeutral['dark-l5'].color))
			// text on shade color
			const darkOnColorLc = Math.abs(wcag3Contrast(paletteNeutral['dark-l0'].color, color))
			const lightOnColorLc = Math.abs(wcag3Contrast(paletteNeutral['light-l1'].color, color))
			const textColorLc = darkOnColorLc < lightOnColorLc ? lightOnColorLc : darkOnColorLc
			const textColor = darkOnColorLc < lightOnColorLc ? paletteNeutral['light-l1'].color : paletteNeutral['dark-l0'].color
			palette[shade] = {
				color,
				colorRGB,
				textColor,
				colorOnLightLc,
				darkOnColorLc,
				lightOnColorLc,
				textColorLc,
				colorOnDarkLc,
			}
		}
	}
	
	const wcag3Contrast = (fg, bg) => {
		const contrast = APCAcontrast(sRGBtoY(colorParsley(fg)), sRGBtoY(colorParsley(bg)))
		return contrast
	}
	const wcag3FontWeightSize = (contract) => {
		const fontSizeLookup = fontLookupAPCA(contract)
		fontSizeLookup.shift()
		const weights = {}
		for (let i = 0, l = fontSizeLookup.length; i<l; i++) {
			const size = fontSizeLookup[i]
			weights[i*100] = size
		}
		return weights
	}
	const wcag3Pass = (contrast, size = 16, weight = 400) => {
		const weightSizes = wcag3FontWeightSize(contrast)
		return (weightSizes[weight] < size)
	}
	const wcag3PassMark = (contrast, size, weight) => {
		return wcag3Pass(contrast, size, weight) ? '✓' : Math.floor(contrast)
	}

	const paletteNeutral = makePalette('#000000', 0, false, shades)
	processPalette(paletteNeutral)
	
	const palettles = [
		{key: 'neutral', ...paletteNeutral}
	]
		const colors = {
			'red': '#c52f21',
			// 'cerise-red': '#D81B60',
			//'cinnabar':'#E53935',
			// 'pomegranate':'#F4511E',
			// 'pizazz':'#FB8C00',
			// 'selective-yellow':'#FFB300',
			// 'bright-yellow':'#FDD835',
			// 'key-lime-pie':'#C0CA33',
			// 'sushi':'#7CB342',
			// 'apple':'#43A047',
			// 'elf-green':'#00897B',
			// 'pelorous':'#00ACC1',
			'curious-blue':'#039BE5',
			// 'cornflower-blue':'#1E88E5',
			// 'cobalt':'#3949AB',
			// 'daisy-bush':'#5E35B1',
			// 'violet-eggplant':'#8E24AA'
		}
		for (const key in colors) {
			const swatch = makePalette(colors[key], 0, false, shades)
			processPalette(swatch)
			palettles.push({key, ...swatch})
		}
</script>

<Meta title="Color"/>

<Template let:args>
  <slot {...args}/>
</Template>

<Story name="Colors">
	<!-- input to paste in color -> show  -->
	<!-- <P style="color: {primary})">{text}</P> -->
	<!-- <Button style="background-color: var({primary})">{text}</Button> -->
	<!-- -c12 can only be on -l1 -->
	{#each palettles as palette}
	{palette.key}
	<div class="palette">
	{#each Object.keys(shades) as shade}
		<div>
			{shade} ({shades[shade].toFixed(2)}) {palette[shade].color}
			{#if shade.includes('-b')}
			<div class="preview" style="background-color: {palette[shade].color}; color: {palette[shade].textColor}; font-weight:700">
				{wcag3PassMark(palette[shade].textColorLc, 18, 700)}
			</div>
			{:else}
			<div class="preview" style="background-color: {palette[shade].color}; color: {palette[shade].textColor}">
				{wcag3PassMark(palette[shade].textColorLc, 18, 400)}
			</div>
			{/if}
						
			{#if shade.includes('light-l') || shade.includes('dark-a') || shade.includes('dark-b')}
			<div class="preview" style="background-color: {palette['dark-l5'].color}; color: {palette[shade].color}">
				{wcag3PassMark(palette[shade].colorOnDarkLc, 18, 400)}
			</div>
			<div class="preview" style="background-color: {palette['dark-l5'].color}; color: {palette[shade].color}; font-weight:700">
				{wcag3PassMark(palette[shade].colorOnDarkLc, 18, 700)}
			</div>

			<div class="preview" style="background-color: {palette['dark-l5'].color};">
				<div class="preview" style="background-color: {palette[shade].color}; color: {palette[shade].textColor}">{wcag3PassMark(palette[shade].colorOnDarkLc, 96, 700)}</div>
			</div>
			
			{:else if shade.includes('dark-l') || shade.includes('light-a') || shade.includes('light-b')}
			<div class="preview" style="background-color: {palette['light-l5'].color}; color: {palette[shade].color}">
				{wcag3PassMark(palette[shade].colorOnLightLc, 18, 400)}
			</div>
			<div class="preview" style="background-color: {palette['light-l5'].color}; color: {palette[shade].color}; font-weight:700">
				{wcag3PassMark(palette[shade].colorOnLightLc, 18, 700)}
			</div>
			<div class="preview" style="background-color: {palette['light-l5'].color};">
				<div class="preview" style="background-color: {palette[shade].color}; color: {palette[shade].textColor}">{wcag3PassMark(palette[shade].colorOnLightLc, 96, 700)}</div>
			</div>
			
			{/if}
			
			
		</div>
	{/each}
	</div>
	 <details>
		<summary>CSS variables</summary>
		<pre><code>@media (prefers-color-scheme: light) 
--color-l0: {palette['light-l0'].color};
--color-l1: {palette['light-l1'].color};
--color-l2: {palette['light-l2'].color};
--color-l3: {palette['light-l3'].color};
--color-l4: {palette['light-l4'].color};
--color-l5: {palette['light-l5'].color};
--color-text: {palette['dark-l0'].color};
--color-primary: {palette['light-a0'].color};
--color-primary-pseudo: {palette['dark-a0'].color};
--color-primary-bold: {palette['light-b0'].color};
--color-primary-bold-pseudo: {palette['dark-b0'].color};
--color-primary-text: {palette['dark-l0'].color};

@media (prefers-color-scheme: dark) 
--color-l0: {palette['dark-l0'].color};
--color-l1: {palette['dark-l1'].color};
--color-l2: {palette['dark-l2'].color};
--color-l3: {palette['dark-l3'].color};
--color-l4: {palette['dark-l4'].color};
--color-l5: {palette['dark-l5'].color};
--color-text: {palette['light-l1'].color};
--color-primary: {palette['dark-a0'].color};
--color-primary-pseudo: {palette['light-a0'].color};
--color-primary-bold: {palette['dark-b0'].color};
--color-primary-bold-pseudo: {palette['light-b0'].color};
--color-primary-text: {palette['light-l1'].color};

</code></pre>
	</details>
	{/each}
	
	<!-- Primary
	<div class="palette">
	{#each Object.keys(shades) as shade}
		<div>
			{shade}
			<div class="preview" style="background-color: {palettePrimary[shade].color}; color: {palettePrimary[shade].textColor}">
				{Math.floor(palettePrimary[shade].colorLc)}{wcag3Pass(palettePrimary[shade].colorLc, 18, 400)}
			</div>
			<div class="preview" style="background-color: {palettePrimary[50].color}; color: {paletteBackground[shade].color}">
				{Math.floor(palettePrimary[shade].lightLc)}{wcag3Pass(palettePrimary[shade].lightLc, 18, 400)}
			</div>
			<div class="preview" style="background-color: {palettePrimary[950].color}; color: {palettePrimary[shade].color}">
				{Math.floor(palettePrimary[shade].darkLc)}{wcag3Pass(palettePrimary[shade].darkLc, 18, 400)}
			</div>
			{palettePrimary[shade].color}
		</div>
	{/each}
	</div>
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
	
	Source:
	https://gka.github.io/palettes/#/12|s|ffffff,0000ee,000000||1|0
	https://accessiblepalette.com/
	https://www.myndex.com/APCA/
</Story>

<style>
	.palette {
		display: flex;
		gap: var(--gap);
	}
	.preview {
		width: 6rem;
		height: 6rem;
		padding: 1rem;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		
		& .preview {
			width: 3rem;
			height: 3rem;
			padding: 0.5rem;
			
		}
	}
</style>