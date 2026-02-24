<script>
import Head from "@components/Head.svelte";
import ButtonSubmit from "@design-system/svelte/ButtonSubmit.svelte";
import Card from "@design-system/svelte/Card.svelte";
import A from "@design-system/svelte/element/a.svelte";
import Abbr from "@design-system/svelte/element/abbr.svelte";
import Address from "@design-system/svelte/element/address.svelte";
import Article from "@design-system/svelte/element/article.svelte";
import Aside from "@design-system/svelte/element/aside.svelte";
import B from "@design-system/svelte/element/b.svelte";
import Button from "@design-system/svelte/element/button.svelte";
import Code from "@design-system/svelte/element/code.svelte";
import Del from "@design-system/svelte/element/del.svelte";
import Details from "@design-system/svelte/element/details.svelte";

import Div from "@design-system/svelte/element/div.svelte";
import Em from "@design-system/svelte/element/em.svelte";
import Form from "@design-system/svelte/element/form.svelte";
import Hgroup from "@design-system/svelte/element/hgroup.svelte";
import I from "@design-system/svelte/element/i.svelte";
import Ins from "@design-system/svelte/element/ins.svelte";
import Kbd from "@design-system/svelte/element/kbd.svelte";
import Li from "@design-system/svelte/element/li.svelte";
import Main from "@design-system/svelte/element/main.svelte";
import Mark from "@design-system/svelte/element/mark.svelte";
import Nav from "@design-system/svelte/element/nav.svelte";
import Ol from "@design-system/svelte/element/ol.svelte";
import P from "@design-system/svelte/element/p.svelte";
import S from "@design-system/svelte/element/s.svelte";
import Search from "@design-system/svelte/element/search.svelte";
import Section from "@design-system/svelte/element/section.svelte";
import Small from "@design-system/svelte/element/small.svelte";
import Span from "@design-system/svelte/element/span.svelte";
import Strong from "@design-system/svelte/element/strong.svelte";
import Sub from "@design-system/svelte/element/sub.svelte";
import Summary from "@design-system/svelte/element/summary.svelte";
import Sup from "@design-system/svelte/element/sup.svelte";
import Time from "@design-system/svelte/element/time.svelte";
import U from "@design-system/svelte/element/u.svelte";
import Ul from "@design-system/svelte/element/ul.svelte";
import Var from "@design-system/svelte/element/var.svelte";
import FieldLegend from "@design-system/svelte/FieldLegend.svelte";
import Fieldset from "@design-system/svelte/Fieldset.svelte";
import H1 from "@design-system/svelte/Heading1.svelte";
import H2 from "@design-system/svelte/Heading2.svelte";
import H3 from "@design-system/svelte/Heading3.svelte";
import H4 from "@design-system/svelte/Heading4.svelte";
import H5 from "@design-system/svelte/Heading5.svelte";
import H6 from "@design-system/svelte/Heading6.svelte";
import HSub from "@design-system/svelte/HeadingSub.svelte";
import Icon from "@design-system/svelte/Icon.svelte";
import Image from "@design-system/svelte/Image.svelte";
import InputCheckbox from "@design-system/svelte/InputCheckbox.svelte";
import InputSearch from "@design-system/svelte/InputSearch.svelte";
import InputText from "@design-system/svelte/InputText.svelte";
import { paragraph } from "@examples/index.js";
</script>

<Head>
	<title>Slices | Layout | Design System</title>
	<meta name="description" content="A sematic fluid design system" />
</Head>

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
			<Div role="group">
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
			<Div role="group">
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
				<Li>
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
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
				z-index: -1;
				& img {
					object-fit: cover;
				}
			}

			/* slice types */
			&.hero {
				/*& > div {
					height: 20vh; /* required for shape-outside *
				}
				& > div:before {
					content: '';
					width: 75%;
					height: 100%;
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
					min-width: 30ch;
					width: calc(50% - var(--gap-padding) / 2);
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
						height: 100%;
					}
				}
			}

			& > .grid {
				list-style: none;
				padding-inline: 0;

				& > li {
					border: var(--border-width) solid var(--border-color, currentColor);
					border-radius: var(--border-radius);
					padding: var(--padding-fixed);
				}
			}
		}
	}
</style>
