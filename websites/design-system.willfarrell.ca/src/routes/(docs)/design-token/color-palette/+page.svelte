<script>
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Hgroup from "@willfarrell-ds/svelte/elements/hgroup.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Main from "@willfarrell-ds/svelte/elements/main.svelte";
import Section from "@willfarrell-ds/svelte/elements/section.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Span from "@willfarrell-ds/svelte/elements/span.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";

const palettes = [
	"neutral",
	"red",
	"cerise-red",
	"cinnabar",
	"pomegranate",
	"pizazz",
	"selective-yellow",
	"bright-yellow",
	"key-lime-pie",
	"sushi",
	"apple",
	"elf-green",
	"pelorous",
	"curious-blue",
	"cornflower-blue",
	"cobalt",
	"daisy-bush",
	"violet-eggplant",
];

const shades = [
	"light-l0",
	"light-l1",
	"light-l2",
	"light-l3",
	"light-l4",
	"light-l5",
	"dark-a0",
	"dark-a8",
	"dark-a12",
	"dark-a16",
	"dark-b0",
	"dark-b8",
	"dark-b12",
	"dark-b16",
	"light-b16",
	"light-b12",
	"light-b8",
	"light-b0",
	"light-a16",
	"light-a12",
	"light-a8",
	"light-a0",
	"dark-l5",
	"dark-l4",
	"dark-l3",
	"dark-l2",
	"dark-l1",
	"dark-l0",
];

const page_ = {
	group: "Design tokens",
	title: "Colour palette",
	update: "2026-10-11",
};
</script>

<svelte:head>
	<title>{page_.title} | {page_.group} | Design System</title>
	<meta name="description" content="Colour palette built from the theme lightness tokens for light and dark colour schemes" />
</svelte:head>

<Main id="main">
	<Hgroup>
		<HSub>{page_.group}</HSub>
		<H1>{page_.title}</H1>
		<HSub><Small>Published on <DataTime datetime={page_.update} /></Small></HSub>
	</Hgroup>
	<Ul>
		<Li>Each swatch is <Code>oklch(from base-colour lightness c h)</Code> using the <Code>--lightness-*</Code> tokens from <Code>theme.css</Code></Li>
		<Li>First swatch: level 0 text on the shade fill</Li>
		<Li>Second swatch: shade text on the opposite level 5 background</Li>
		<Li>Button shades (<Code>-b</Code>) are shown bold</Li>
	</Ul>
	{#each palettes as palette (palette)}
		<Section>
			<H2>{palette}</H2>
			<Ul class="palette palette-{palette}">
				{#each shades as shade (shade)}
					<Li class="shade-{shade}{shade.includes('-b') ? ' bold' : ''}">
						<Span class="swatch">Aa</Span>
						<Span class="swatch-on-bg">Aa</Span>
						<Small>{shade}</Small>
					</Li>
				{/each}
			</Ul>
		</Section>
	{/each}
</Main>

<style>
	:global {
		.palette {
			display: flex;
			flex-wrap: wrap;
			gap: var(--gap);
			padding: 0;
			list-style: none;

			& > li {
				--swatch: oklch(from var(--swatch-base) var(--swatch-l) c h);
				--swatch-is-light: clamp(0, (var(--swatch-l) - 0.6) * 999, 1);
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 0.5rem;
			}

			& > .bold {
				font-weight: 700;
			}

			& .swatch,
			& .swatch-on-bg {
				display: grid;
				place-items: center;
				inline-size: 4rem;
				block-size: 4rem;
				border-radius: 1rem;
				forced-color-adjust: none;
			}

			& .swatch {
				background-color: var(--swatch);
				color: oklch(
					from var(--swatch-base)
					calc(
						var(--swatch-is-light) * var(--lightness-dark-l0) +
						(1 - var(--swatch-is-light)) * var(--lightness-light-l1)
					)
					c h
				);
			}

			& .swatch-on-bg {
				background-color: oklch(
					from var(--swatch-base)
					calc(
						var(--swatch-is-light) * var(--lightness-dark-l5) +
						(1 - var(--swatch-is-light)) * var(--lightness-light-l5)
					)
					c h
				);
				color: var(--swatch);
			}
		}

		.palette-neutral {
			--swatch-base: var(--hex-none);
		}
		.palette-red {
			--swatch-base: #cd4b3f;
		}
		.palette-cerise-red {
			--swatch-base: #dc306f;
		}
		.palette-cinnabar {
			--swatch-base: #dd3733;
		}
		.palette-pomegranate {
			--swatch-base: #d4461a;
		}
		.palette-pizazz {
			--swatch-base: #b26300;
		}
		.palette-selective-yellow {
			--swatch-base: #9d6e00;
		}
		.palette-bright-yellow {
			--swatch-base: #8a761d;
		}
		.palette-key-lime-pie {
			--swatch-base: #767c1f;
		}
		.palette-sushi {
			--swatch-base: #5a8230;
		}
		.palette-apple {
			--swatch-base: #38873c;
		}
		.palette-elf-green {
			--swatch-base: #008678;
		}
		.palette-pelorous {
			--swatch-base: #008393;
		}
		.palette-curious-blue {
			--swatch-base: #027eba;
		}
		.palette-cornflower-blue {
			--swatch-base: #1b7acd;
		}
		.palette-cobalt {
			--swatch-base: #6572be;
		}
		.palette-daisy-bush {
			--swatch-base: #8566c4;
		}
		.palette-violet-eggplant {
			--swatch-base: #a755bd;
		}

		.shade-light-l0 {
			--swatch-l: var(--lightness-light-l0);
		}
		.shade-light-l1 {
			--swatch-l: var(--lightness-light-l1);
		}
		.shade-light-l2 {
			--swatch-l: var(--lightness-light-l2);
		}
		.shade-light-l3 {
			--swatch-l: var(--lightness-light-l3);
		}
		.shade-light-l4 {
			--swatch-l: var(--lightness-light-l4);
		}
		.shade-light-l5 {
			--swatch-l: var(--lightness-light-l5);
		}
		.shade-dark-a0 {
			--swatch-l: var(--lightness-dark-a0);
		}
		.shade-dark-a8 {
			--swatch-l: var(--lightness-dark-a8);
		}
		.shade-dark-a12 {
			--swatch-l: var(--lightness-dark-a12);
		}
		.shade-dark-a16 {
			--swatch-l: var(--lightness-dark-a16);
		}
		.shade-dark-b0 {
			--swatch-l: var(--lightness-dark-b0);
		}
		.shade-dark-b8 {
			--swatch-l: var(--lightness-dark-b8);
		}
		.shade-dark-b12 {
			--swatch-l: var(--lightness-dark-b12);
		}
		.shade-dark-b16 {
			--swatch-l: var(--lightness-dark-b16);
		}
		.shade-light-b16 {
			--swatch-l: var(--lightness-light-b16);
		}
		.shade-light-b12 {
			--swatch-l: var(--lightness-light-b12);
		}
		.shade-light-b8 {
			--swatch-l: var(--lightness-light-b8);
		}
		.shade-light-b0 {
			--swatch-l: var(--lightness-light-b0);
		}
		.shade-light-a16 {
			--swatch-l: var(--lightness-light-a16);
		}
		.shade-light-a12 {
			--swatch-l: var(--lightness-light-a12);
		}
		.shade-light-a8 {
			--swatch-l: var(--lightness-light-a8);
		}
		.shade-light-a0 {
			--swatch-l: var(--lightness-light-a0);
		}
		.shade-dark-l5 {
			--swatch-l: var(--lightness-dark-l5);
		}
		.shade-dark-l4 {
			--swatch-l: var(--lightness-dark-l4);
		}
		.shade-dark-l3 {
			--swatch-l: var(--lightness-dark-l3);
		}
		.shade-dark-l2 {
			--swatch-l: var(--lightness-dark-l2);
		}
		.shade-dark-l1 {
			--swatch-l: var(--lightness-dark-l1);
		}
		.shade-dark-l0 {
			--swatch-l: var(--lightness-dark-l0);
		}
	}
</style>
