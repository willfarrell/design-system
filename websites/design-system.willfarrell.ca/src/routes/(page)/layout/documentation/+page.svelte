<script>
import Example from "@components/Example.svelte";
import NavDocumentation from "@components/NavDocumentation.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import H4 from "@design-system/components/Heading4.svelte";
import H5 from "@design-system/components/Heading5.svelte";
import H6 from "@design-system/components/Heading6.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import Image from "@design-system/components/Image.svelte";
import LayoutAside from "@design-system/components/LayoutAside.svelte";
import LayoutTableOfContents from "@design-system/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@design-system/components/NavScrollspy.svelte";
import A from "@design-system/elements/a.svelte";
import Abbr from "@design-system/elements/abbr.svelte";
import Address from "@design-system/elements/address.svelte";
import Article from "@design-system/elements/article.svelte";
import Aside from "@design-system/elements/aside.svelte";
import B from "@design-system/elements/b.svelte";
import Blockquote from "@design-system/elements/blockquote.svelte";
import Button from "@design-system/elements/button.svelte";
import Cite from "@design-system/elements/cite.svelte";
import Code from "@design-system/elements/code.svelte";
import Del from "@design-system/elements/del.svelte";
import Details from "@design-system/elements/details.svelte";
import Div from "@design-system/elements/div.svelte";
import Em from "@design-system/elements/em.svelte";
import Footer from "@design-system/elements/footer.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import I from "@design-system/elements/i.svelte";
import Img from "@design-system/elements/img.svelte";
import Ins from "@design-system/elements/ins.svelte";
import Kbd from "@design-system/elements/kbd.svelte";
import Li from "@design-system/elements/li.svelte";
import Main from "@design-system/elements/main.svelte";
import Mark from "@design-system/elements/mark.svelte";
import Nav from "@design-system/elements/nav.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";
import S from "@design-system/elements/s.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Strong from "@design-system/elements/strong.svelte";
import Sub from "@design-system/elements/sub.svelte";
import Summary from "@design-system/elements/summary.svelte";
import Sup from "@design-system/elements/sup.svelte";
import U from "@design-system/elements/u.svelte";
import Ul from "@design-system/elements/ul.svelte";
import Var from "@design-system/elements/var.svelte";
import { paragraph } from "@examples/index.js";
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
