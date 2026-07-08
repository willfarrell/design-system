<script>
import ButtonSubmit from "@design-system/components/ButtonSubmit.svelte";
import Card from "@design-system/components/Card.svelte";
import FieldLegend from "@design-system/components/FieldLegend.svelte";
import Fieldset from "@design-system/components/Fieldset.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import H4 from "@design-system/components/Heading4.svelte";
import H5 from "@design-system/components/Heading5.svelte";
import H6 from "@design-system/components/Heading6.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import Icon from "@design-system/components/Icon.svelte";
import Image from "@design-system/components/Image.svelte";
import InputCheckbox from "@design-system/components/InputCheckbox.svelte";
import InputSearch from "@design-system/components/InputSearch.svelte";
import InputText from "@design-system/components/InputText.svelte";
import A from "@design-system/elements/a.svelte";
import Abbr from "@design-system/elements/abbr.svelte";
import Address from "@design-system/elements/address.svelte";
import Article from "@design-system/elements/article.svelte";
import Aside from "@design-system/elements/aside.svelte";
import B from "@design-system/elements/b.svelte";
import Button from "@design-system/elements/button.svelte";
import Code from "@design-system/elements/code.svelte";
import Del from "@design-system/elements/del.svelte";
import Details from "@design-system/elements/details.svelte";
import Div from "@design-system/elements/div.svelte";
import Em from "@design-system/elements/em.svelte";
import Form from "@design-system/elements/form.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import I from "@design-system/elements/i.svelte";
import Ins from "@design-system/elements/ins.svelte";
import Kbd from "@design-system/elements/kbd.svelte";
import Li from "@design-system/elements/li.svelte";
import Main from "@design-system/elements/main.svelte";
import Mark from "@design-system/elements/mark.svelte";
import Nav from "@design-system/elements/nav.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";
import S from "@design-system/elements/s.svelte";
import Search from "@design-system/elements/search.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Span from "@design-system/elements/span.svelte";
import Strong from "@design-system/elements/strong.svelte";
import Sub from "@design-system/elements/sub.svelte";
import Summary from "@design-system/elements/summary.svelte";
import Sup from "@design-system/elements/sup.svelte";
import Time from "@design-system/elements/time.svelte";
import U from "@design-system/elements/u.svelte";
import Ul from "@design-system/elements/ul.svelte";
import Var from "@design-system/elements/var.svelte";
import { paragraph } from "@examples/index.js";
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
