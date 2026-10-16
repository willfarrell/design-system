<script>
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import H3 from "@willfarrell-ds/svelte/components/Heading3.svelte";
import H4 from "@willfarrell-ds/svelte/components/Heading4.svelte";
import H5 from "@willfarrell-ds/svelte/components/Heading5.svelte";
import H6 from "@willfarrell-ds/svelte/components/Heading6.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import Image from "@willfarrell-ds/svelte/components/Image.svelte";
import LayoutAside from "@willfarrell-ds/svelte/components/LayoutAside.svelte";
import LayoutTableOfContents from "@willfarrell-ds/svelte/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@willfarrell-ds/svelte/components/NavScrollspy.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Abbr from "@willfarrell-ds/svelte/elements/abbr.svelte";
import Address from "@willfarrell-ds/svelte/elements/address.svelte";
import Article from "@willfarrell-ds/svelte/elements/article.svelte";
import Aside from "@willfarrell-ds/svelte/elements/aside.svelte";
import B from "@willfarrell-ds/svelte/elements/b.svelte";
import Blockquote from "@willfarrell-ds/svelte/elements/blockquote.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Cite from "@willfarrell-ds/svelte/elements/cite.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Del from "@willfarrell-ds/svelte/elements/del.svelte";
import Details from "@willfarrell-ds/svelte/elements/details.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import Em from "@willfarrell-ds/svelte/elements/em.svelte";
import Footer from "@willfarrell-ds/svelte/elements/footer.svelte";
import Hgroup from "@willfarrell-ds/svelte/elements/hgroup.svelte";
import I from "@willfarrell-ds/svelte/elements/i.svelte";
import Img from "@willfarrell-ds/svelte/elements/img.svelte";
import Ins from "@willfarrell-ds/svelte/elements/ins.svelte";
import Kbd from "@willfarrell-ds/svelte/elements/kbd.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Main from "@willfarrell-ds/svelte/elements/main.svelte";
import Mark from "@willfarrell-ds/svelte/elements/mark.svelte";
import Nav from "@willfarrell-ds/svelte/elements/nav.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import S from "@willfarrell-ds/svelte/elements/s.svelte";
import Section from "@willfarrell-ds/svelte/elements/section.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Strong from "@willfarrell-ds/svelte/elements/strong.svelte";
import Sub from "@willfarrell-ds/svelte/elements/sub.svelte";
import Summary from "@willfarrell-ds/svelte/elements/summary.svelte";
import Sup from "@willfarrell-ds/svelte/elements/sup.svelte";
import U from "@willfarrell-ds/svelte/elements/u.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import Var from "@willfarrell-ds/svelte/elements/var.svelte";
import Example from "#components/Example.svelte";
import NavDocumentation from "#components/NavDocumentation.svelte";
import { paragraph } from "#examples/index.js";
</script>

<svelte:head>
	<title>Documentation | Layout | Design System</title>
	<meta name="description" content="A semantic fluid design system" />
</svelte:head>

<LayoutAside>
	{#snippet aside()}
		<NavDocumentation />
	{/snippet}
	<LayoutTableOfContents>
		{#snippet header(id)}
			<Hgroup {id}>
				<H1>fluid design</H1>
				<HSub>Subheading</HSub>
				<HSub
					><Small>Published on <DataTime datetime="2000-01-01">January 1st, 2000</DataTime></Small
					></HSub
				>
			</Hgroup>
		{/snippet}
		{#snippet aside()}
			<NavScrollspy>
				{#snippet children()}
					<Ol>
						<Li><A href="#paragraph">paragraph</A></Li>
						<Li><A href="#glossary">glossary</A></Li>
						<Li><A href="#footnotes">footnotes</A></Li>
					</Ol>
			{/snippet}

			</NavScrollspy>
		{/snippet}
		<Section>
			<H2 id="paragraph">Paragraphs</H2>
			<P>{paragraph}</P>
			<P>{paragraph}</P>
			<Blockquote>
				“The Semantic Web is not a separate Web but an extension of the current one, in which
				information is given well-defined meaning, better enabling computers and people to work in
				cooperation.”
				<Footer>
					— <Cite>Tim Berners-Lee</Cite>
				</Footer>
			</Blockquote>
			<P>{paragraph}</P>
			<H3 id="h3-paragraph">Sub section</H3>
			<P>{paragraph}</P>
			<Image src="/img/placeholder/16_9.640x359.png" alt="Placeholder image, 16:9, 640 by 359 pixels" width="640" height="359" />
			<P>{paragraph}</P>
			<P>{paragraph}</P>
			<Example component="table" />
			<P>{paragraph}</P>
			<P>{paragraph}</P>
		</Section>
		<Section>
			<H2 id="glossary">Glossary</H2>
			<P>{paragraph}</P>
			<P>{paragraph}</P>
			<P>{paragraph}</P>
			<H3 id="h3-glossary">Sub section</H3>
			<P>{paragraph}</P>
			<P>{paragraph}</P>
			<P>{paragraph}</P>
		</Section>
		<Section>
			<H2 id="footnotes">Footnotes</H2>
			<P>{paragraph}</P>
			<P>{paragraph}</P>
			<P>{paragraph}</P>
			<H3 id="h3-footnotes">Sub section</H3>
			<P>{paragraph}</P>
			<P>{paragraph}</P>
			<P>{paragraph}</P>
		</Section>
		<!-- TODO nav prev/next-->
	</LayoutTableOfContents>
</LayoutAside>
