<script>
import ButtonSubmit from "@willfarrell-ds/svelte/components/ButtonSubmit.svelte";
import Card from "@willfarrell-ds/svelte/components/Card.svelte";
import FieldLegend from "@willfarrell-ds/svelte/components/FieldLegend.svelte";
import Fieldset from "@willfarrell-ds/svelte/components/Fieldset.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import H3 from "@willfarrell-ds/svelte/components/Heading3.svelte";
import H4 from "@willfarrell-ds/svelte/components/Heading4.svelte";
import H5 from "@willfarrell-ds/svelte/components/Heading5.svelte";
import H6 from "@willfarrell-ds/svelte/components/Heading6.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import Icon from "@willfarrell-ds/svelte/components/Icon.svelte";
import Image from "@willfarrell-ds/svelte/components/Image.svelte";
import InputCheckbox from "@willfarrell-ds/svelte/components/InputCheckbox.svelte";
import InputSearch from "@willfarrell-ds/svelte/components/InputSearch.svelte";
import InputText from "@willfarrell-ds/svelte/components/InputText.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Abbr from "@willfarrell-ds/svelte/elements/abbr.svelte";
import Address from "@willfarrell-ds/svelte/elements/address.svelte";
import Article from "@willfarrell-ds/svelte/elements/article.svelte";
import Aside from "@willfarrell-ds/svelte/elements/aside.svelte";
import B from "@willfarrell-ds/svelte/elements/b.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Del from "@willfarrell-ds/svelte/elements/del.svelte";
import Details from "@willfarrell-ds/svelte/elements/details.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import Em from "@willfarrell-ds/svelte/elements/em.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import Hgroup from "@willfarrell-ds/svelte/elements/hgroup.svelte";
import I from "@willfarrell-ds/svelte/elements/i.svelte";
import Ins from "@willfarrell-ds/svelte/elements/ins.svelte";
import Kbd from "@willfarrell-ds/svelte/elements/kbd.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Main from "@willfarrell-ds/svelte/elements/main.svelte";
import Mark from "@willfarrell-ds/svelte/elements/mark.svelte";
import Nav from "@willfarrell-ds/svelte/elements/nav.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import S from "@willfarrell-ds/svelte/elements/s.svelte";
import Search from "@willfarrell-ds/svelte/elements/search.svelte";
import Section from "@willfarrell-ds/svelte/elements/section.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Span from "@willfarrell-ds/svelte/elements/span.svelte";
import Strong from "@willfarrell-ds/svelte/elements/strong.svelte";
import Sub from "@willfarrell-ds/svelte/elements/sub.svelte";
import Summary from "@willfarrell-ds/svelte/elements/summary.svelte";
import Sup from "@willfarrell-ds/svelte/elements/sup.svelte";
import Time from "@willfarrell-ds/svelte/elements/time.svelte";
import U from "@willfarrell-ds/svelte/elements/u.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import Var from "@willfarrell-ds/svelte/elements/var.svelte";
import { paragraph } from "#examples/index.js";
</script>

<svelte:head>
	<title>Slices | Layout | Design System</title>
	<meta name="description" content="A semantic fluid design system" />
</svelte:head>

<Main id="main" class="container-slices">
	<Section class="slice hero vertical" data-theme="dark">
		<Image
			alt=""
			src="/img/placeholder/16_9.640x359.png"
			width="640"
			height="359"
			decoding="auto"
			fetchpriority="high"
			loading="eager"
		/>
		<Div class="inline-center">
			<Hgroup>
				<H1>Hero slice</H1>
				<HSub>call to action statement {paragraph.substring(0, 120)}</HSub>
			</Hgroup>
			<Div class="group">
				<A href="#" class="button">call to action</A>
			</Div>
		</Div>
	</Section>
	<Section class="slice horizontal">
		<Div class="inline-start">
			<H2>Side-by-side</H2>
			<P>{paragraph}</P>
			<A href="#" class="button">call to action</A>
		</Div>
		<Div class="background-img">
			<Image alt="" src="/img/placeholder/16_9.640x359.png" width="640" height="359" />
		</Div>
	</Section>
	<Section class="slice horizontal">
		<Div class="block-middle">
			<Image alt="" src="/img/placeholder/16_9.640x359.png" width="640" height="359" />
		</Div>
		<Div class="inline-start">
			<H2>Side-by-side</H2>
			<P>{paragraph}</P>
			<A href="#" class="button">call to action</A>
		</Div>
	</Section>
	<Section class="slice vertical">
		<Div class="inline-center">
			<H2>Vertical center</H2>
			<P>{paragraph}</P>
			<A href="#" class="button">call to action</A>
		</Div>
	</Section>
	<Section class="slice hero horizontal" data-theme="dark">
		<Image
			alt=""
			src="/img/placeholder/16_9.640x359.png"
			width="640"
			height="359"
			decoding="auto"
			fetchpriority="high"
			loading="eager"
		/>
		<Div class="inline-start">
			<Hgroup>
				<H1>Hero slice</H1>
				<HSub>call to action statement {paragraph.substring(0, 120)}</HSub>
			</Hgroup>
			<Div class="group">
				<A href="#" class="button">call to action</A>
			</Div>
		</Div>
	</Section>

	<Section class="slice vertical">
		<Div class="inline-center">
			<H2>Nested</H2>
		</Div>
		<Div class="horizontal">
			<Div class="block-start">
				<P>{paragraph}</P>
			</Div>
			<Div class="block-start">
				<P>{paragraph}</P>
			</Div>
		</Div>
	</Section>
	<Section class="slice vertical">
		<Div class="inline-center">
			<H2>Grid</H2>
			<P>{paragraph.substring(0, 120)}</P>
		</Div>
		<Ul class="grid">
			{#each new Array(8).fill('x') as item, idx}
				<Li class="card">
					<H3>Item {idx}</H3>
					<P>{paragraph.substring(0, 35)}</P>
				</Li>
			{/each}
		</Ul>
	</Section>
</Main>

<style global>
	.container-slices {
				display: flex;
				flex-direction: column;

				& section {
					position: relative;
					display: flex;
					flex-direction: column;
					--block-padding: 5vw;
					--inline-padding: var(--padding-page-inline);
					--gap-padding: max(1rem, 5vw);

					/* background image for entire slice */
					& > picture {
						position: absolute;
						inset-block-start: 0px;
						inset-inline-start: 0px;
						inline-size: 100%;
						block-size: 100%;
						z-index: -1;
						& img {
							object-fit: cover;
						}
					}

					/* slice types */
					&.hero {
						/*& > div {
							block-size: 20vh; /* required for shape-outside *
						}
						& > div:before {
							content: '';
							inline-size: 75%;
							block-size: 100%;
							shape-outside: polygon(0 100%, 100% 0, 100% 100%);
							float: right;

							background-color: lightblue;
							clip-path: polygon(0 100%, 100% 0, 100% 100%);
						}*/
						[role='group'] {
							margin-block-start: 1rem;
						}
					}
					&.horizontal,
					&.vertical {
						padding: var(--block-padding) var(--inline-padding);
					}
					/* Can be nested inside vertical */
					&.horizontal,
					& .horizontal {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						gap: var(--gap-padding);
						& > div {
							min-inline-size: min(30ch, 100%);
							inline-size: calc(50% - var(--gap-padding) / 2);
							overflow-wrap: anywhere;
						}
					}

					/* ## layout overrides ## */
					& > .inline-start {
						text-align: start;
						justify-items: start;
					}
					& > .inline-center {
						text-align: center;
						justify-items: center;
					}
					& > .inline-end {
						text-align: end;
						justify-items: end;
					}
					& > .block-start {
						margin-block: 0 auto;
					}
					& > .block-middle {
						margin-block: auto;
					}
					& > .block-end {
						margin-block: auto 0;
					}
					& > .background-img {
						& > picture {
							& > img {
								object-fit: cover;
								block-size: 100%;
							}
						}
					}

					& > .grid {
						list-style: none;
						padding-inline: 0;

						& > li.card {
							border: var(--border-width) solid var(--border-color, currentColor);
							border-radius: var(--border-radius);
							padding: var(--padding-fixed);
						}
					}
				}
			}
</style>
