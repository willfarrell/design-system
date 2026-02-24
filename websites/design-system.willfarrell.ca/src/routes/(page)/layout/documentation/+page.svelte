<script>
import Example from "@components/Example.svelte";
import Head from "@components/Head.svelte";
import NavDocumentation from "@components/NavDocumentation.svelte";
import DataTime from "@design-system/svelte/DataTime.svelte";
import A from "@design-system/svelte/element/a.svelte";
import Abbr from "@design-system/svelte/element/abbr.svelte";
import Address from "@design-system/svelte/element/address.svelte";
import Article from "@design-system/svelte/element/article.svelte";
import Aside from "@design-system/svelte/element/aside.svelte";
import B from "@design-system/svelte/element/b.svelte";
import Blockquote from "@design-system/svelte/element/blockquote.svelte";
import Button from "@design-system/svelte/element/button.svelte";
import Cite from "@design-system/svelte/element/cite.svelte";
import Code from "@design-system/svelte/element/code.svelte";
import Del from "@design-system/svelte/element/del.svelte";
import Details from "@design-system/svelte/element/details.svelte";
import Div from "@design-system/svelte/element/div.svelte";
import Em from "@design-system/svelte/element/em.svelte";
import Footer from "@design-system/svelte/element/footer.svelte";
import Header from "@design-system/svelte/element/header.svelte";
import Hgroup from "@design-system/svelte/element/hgroup.svelte";
import I from "@design-system/svelte/element/i.svelte";
import Img from "@design-system/svelte/element/img.svelte";
import Ins from "@design-system/svelte/element/ins.svelte";
import Kbd from "@design-system/svelte/element/kbd.svelte";
import Li from "@design-system/svelte/element/li.svelte";
import Main from "@design-system/svelte/element/main.svelte";
import Mark from "@design-system/svelte/element/mark.svelte";
import Nav from "@design-system/svelte/element/nav.svelte";
import Ol from "@design-system/svelte/element/ol.svelte";
import P from "@design-system/svelte/element/p.svelte";
import S from "@design-system/svelte/element/s.svelte";
import Section from "@design-system/svelte/element/section.svelte";
import Small from "@design-system/svelte/element/small.svelte";
import Strong from "@design-system/svelte/element/strong.svelte";
import Sub from "@design-system/svelte/element/sub.svelte";
import Summary from "@design-system/svelte/element/summary.svelte";
import Sup from "@design-system/svelte/element/sup.svelte";
import U from "@design-system/svelte/element/u.svelte";
import Ul from "@design-system/svelte/element/ul.svelte";
import Var from "@design-system/svelte/element/var.svelte";
import H1 from "@design-system/svelte/Heading1.svelte";
import H2 from "@design-system/svelte/Heading2.svelte";
import H3 from "@design-system/svelte/Heading3.svelte";
import H4 from "@design-system/svelte/Heading4.svelte";
import H5 from "@design-system/svelte/Heading5.svelte";
import H6 from "@design-system/svelte/Heading6.svelte";
import HSub from "@design-system/svelte/HeadingSub.svelte";
import Image from "@design-system/svelte/Image.svelte";
import LayoutAside from "@design-system/svelte/LayoutAside.svelte";
import LayoutTableOfContents from "@design-system/svelte/LayoutTableOfContents.svelte";
import NavScrollspy from "@design-system/svelte/NavScrollspy.svelte";
import { paragraph } from "@examples/index.js";
</script>

<Head>
	<title>Documentation | Layout | Design System</title>
	<meta name="description" content="A sematic fluid design system" />
</Head>

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
				<Section>
					<Header><H2>On this page</H2></Header>
					<Ol>
						<Li><A href="#paragraph">paragraph</A></Li>
						<Li><A href="#glossary">glossary</A></Li>
						<Li><A href="#footnotes">footnotes</A></Li>
					</Ol>
				</Section>
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
			<Image src="/img/placeholder/16_9.640x359.png" width="640" height="359" />
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
