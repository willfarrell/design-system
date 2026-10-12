<script>
import Codeblock from "@willfarrell-ds/svelte/components/Codeblock.svelte";
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import H3 from "@willfarrell-ds/svelte/components/Heading3.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Del from "@willfarrell-ds/svelte/elements/del.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import Hgroup from "@willfarrell-ds/svelte/elements/hgroup.svelte";
import Ins from "@willfarrell-ds/svelte/elements/ins.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Main from "@willfarrell-ds/svelte/elements/main.svelte";
import Mark from "@willfarrell-ds/svelte/elements/mark.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Section from "@willfarrell-ds/svelte/elements/section.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Strong from "@willfarrell-ds/svelte/elements/strong.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import theme from "@willfarrell-ds/vanilla/theme.css?raw";

const hexVariables = theme.match(/^\s*--hex-[\w-]+:.*$/gm) ?? [];

const page_ = {
	group: "Design tokens",
	title: "Colour roles",
	update: "2026-10-11",
};
</script>

<svelte:head>
	<title>{page_.title} | {page_.group} | Design System</title>
	<meta name="description" content="Colour roles for the semantic fluid design system across colour schemes and contrast preferences" />
</svelte:head>

<Main id="main">
	<Hgroup>
		<HSub>{page_.group}</HSub>
		<H1>{page_.title}</H1>
		<HSub><Small>Published on <DataTime datetime={page_.update} /></Small></HSub>
	</Hgroup>
	{#each ['light', 'dark'] as scheme (scheme)}
		<Section>
			<Hgroup>
				<HSub><Small>prefers-color-scheme</Small></HSub>
				<H2>{scheme}</H2>
			</Hgroup>
			<Div class="grid">
				{#each ['no-preference', 'more'] as contrast (contrast)}
					<Div>
						<Hgroup>
							<HSub><Small>prefers-contrast</Small></HSub>
							<H3>{contrast}</H3>
						</Hgroup>
						<Div class="roles scheme-{scheme} contrast-{contrast}">
							{#each [0, 1, 2, 3, 4, 5] as level (level)}
								<Div class="window level-{level}">
									<P
										>text <A href="#main">link</A>
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
		<H2>Theme colours</H2>
		<P>Override any of these on <Code>:root</Code>; every role is derived from them with <Code>oklch(from …)</Code>.</P>
		<Codeblock language="css" code={`:root {\n${hexVariables.join("\n")}\n}`} />
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

<style>
	:global {
		@media (forced-colors: none) {
			.roles {
				--color-l0: oklch(from var(--theme-color, var(--hex-none)) var(--lightness-l0) c h);
				--color-l1: oklch(from var(--theme-color, var(--hex-none)) var(--lightness-l1) c h);
				--color-l2: oklch(from var(--theme-color, var(--hex-none)) var(--lightness-l2) c h);
				--color-l3: oklch(from var(--theme-color, var(--hex-none)) var(--lightness-l3) c h);
				--color-l4: oklch(from var(--theme-color, var(--hex-none)) var(--lightness-l4) c h);
				--color-l5: oklch(from var(--theme-color, var(--hex-none)) var(--lightness-l5) c h);
				--color-text: oklch(from var(--theme-color, var(--hex-none)) var(--lightness-text) c h);
				--color-fill-text: oklch(from var(--theme-color, var(--hex-none)) var(--lightness-fill-text) c h);
				--color-focus: oklch(from var(--hex-main) var(--lightness-main) c h);
				--color-main: oklch(from var(--hex-main) var(--lightness-main) c h);
				--color-main-pseudo: oklch(from var(--hex-main) var(--lightness-main-pseudo) c h);
				--color-main-bold: oklch(from var(--hex-main) var(--lightness-main-bold) c h);
				--color-main-bold-pseudo: oklch(from var(--hex-main) var(--lightness-main-bold-pseudo) c h);
				--color-ins: oklch(from var(--hex-ins) var(--lightness-semantic) c h);
				--color-del: oklch(from var(--hex-del) var(--lightness-semantic) c h);
				--color-mark: oklch(from var(--hex-mark) var(--lightness-semantic) c h);
				padding: 0.5rem;
				background-color: var(--color-l0);
				color: var(--color-text);
			}

			.scheme-light {
				color-scheme: light;
				--lightness-l0: var(--lightness-light-l0);
				--lightness-l1: var(--lightness-light-l1);
				--lightness-l2: var(--lightness-light-l2);
				--lightness-l3: var(--lightness-light-l3);
				--lightness-l4: var(--lightness-light-l4);
				--lightness-l5: var(--lightness-light-l5);
				--lightness-text: var(--lightness-dark-l0);
				--lightness-fill-text: var(--lightness-light-l0);
				--lightness-main: var(--lightness-light-a0);
				--lightness-main-pseudo: var(--lightness-dark-a0);
				--lightness-main-bold: var(--lightness-light-b8);
				--lightness-main-bold-pseudo: var(--lightness-dark-b8);
				--lightness-semantic: var(--lightness-light-b12);
			}

			.scheme-dark {
				color-scheme: dark;
				--lightness-l0: var(--lightness-dark-l0);
				--lightness-l1: var(--lightness-dark-l1);
				--lightness-l2: var(--lightness-dark-l2);
				--lightness-l3: var(--lightness-dark-l3);
				--lightness-l4: var(--lightness-dark-l4);
				--lightness-l5: var(--lightness-dark-l5);
				--lightness-text: var(--lightness-light-l1);
				--lightness-fill-text: var(--lightness-dark-l1);
				--lightness-main: var(--lightness-dark-a0);
				--lightness-main-pseudo: var(--lightness-light-a0);
				--lightness-main-bold: var(--lightness-dark-b8);
				--lightness-main-bold-pseudo: var(--lightness-light-b8);
				--lightness-semantic: var(--lightness-dark-b12);
			}

			.scheme-light.contrast-more {
				--lightness-text: 0.27;
				--lightness-fill-text: 1;
				--lightness-main: 0.27;
				--lightness-main-pseudo: 0.97;
				--lightness-main-bold: 0.27;
				--lightness-main-bold-pseudo: 0.97;
				--lightness-semantic: 0.27;
			}

			.scheme-dark.contrast-more {
				--lightness-text: 0.97;
				--lightness-fill-text: 0.2393;
				--lightness-main: 0.97;
				--lightness-main-pseudo: 0.27;
				--lightness-main-bold: 0.97;
				--lightness-main-bold-pseudo: 0.27;
				--lightness-semantic: 0.97;
			}

			.roles .level-0 {
				background-color: var(--color-l0);
			}
			.roles .level-1 {
				background-color: var(--color-l1);
			}
			.roles .level-2 {
				background-color: var(--color-l2);
			}
			.roles .level-3 {
				background-color: var(--color-l3);
			}
			.roles .level-4 {
				background-color: var(--color-l4);
			}
			.roles .level-5 {
				background-color: var(--color-l5);
			}
		}

		.roles .window {
			margin: 0.5rem;
			padding: 1rem;
			border-radius: 0.5rem;
		}
	}
</style>
