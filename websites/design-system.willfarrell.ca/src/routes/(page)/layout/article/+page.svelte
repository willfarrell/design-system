<script>
import Example from "@components/Example.svelte";
import Head from "@components/Head.svelte";
import Card from "@design-system/svelte/Card.svelte";
import DataTime from "@design-system/svelte/DataTime.svelte";
import A from "@design-system/svelte/element/a.svelte";
import Abbr from "@design-system/svelte/element/abbr.svelte";
import Address from "@design-system/svelte/element/address.svelte";
import Article from "@design-system/svelte/element/article.svelte";
import B from "@design-system/svelte/element/b.svelte";
import Blockquote from "@design-system/svelte/element/blockquote.svelte";
import Button from "@design-system/svelte/element/button.svelte";
import Caption from "@design-system/svelte/element/caption.svelte";
import Cite from "@design-system/svelte/element/cite.svelte";
import Code from "@design-system/svelte/element/code.svelte";
import Col from "@design-system/svelte/element/col.svelte";
import Colgroup from "@design-system/svelte/element/colgroup.svelte";
import Dd from "@design-system/svelte/element/dd.svelte";
import Del from "@design-system/svelte/element/del.svelte";
import Dl from "@design-system/svelte/element/dl.svelte";
import Dt from "@design-system/svelte/element/dt.svelte";
import Em from "@design-system/svelte/element/em.svelte";
import Footer from "@design-system/svelte/element/footer.svelte";
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
import Sup from "@design-system/svelte/element/sup.svelte";
import Tbody from "@design-system/svelte/element/tbody.svelte";
import Td from "@design-system/svelte/element/td.svelte";
import Tfoot from "@design-system/svelte/element/tfoot.svelte";
import Th from "@design-system/svelte/element/th.svelte";
import Thead from "@design-system/svelte/element/thead.svelte";
import Tr from "@design-system/svelte/element/tr.svelte";
import U from "@design-system/svelte/element/u.svelte";
import Ul from "@design-system/svelte/element/ul.svelte";
import Var from "@design-system/svelte/element/var.svelte";
import FootnoteLink from "@design-system/svelte/FootnoteLink.svelte";
import Footnotes from "@design-system/svelte/Footnotes.svelte";
import H1 from "@design-system/svelte/Heading1.svelte";
import H2 from "@design-system/svelte/Heading2.svelte";
import H3 from "@design-system/svelte/Heading3.svelte";
import H4 from "@design-system/svelte/Heading4.svelte";
import H5 from "@design-system/svelte/Heading5.svelte";
import H6 from "@design-system/svelte/Heading6.svelte";
import HSub from "@design-system/svelte/HeadingSub.svelte";
import Image from "@design-system/svelte/Image.svelte";
import LayoutCenter from "@design-system/svelte/LayoutCenter.svelte";
import Table from "@design-system/svelte/Table.svelte";
import { paragraph } from "@examples/index.js";

const footnotes = [
	{ id: "one", value: "first footnote" },
	{ id: "two", value: "second footnote" },
	{ id: "three", value: "third footnote" },
];
</script>

<Head>
	<title>Article | Layout | Design System</title>
	<meta name="description" content="A sematic fluid design system" />
</Head>

<LayoutCenter>
	<Article>
		<Section>
			<Hgroup>
				<H1>fluid design</H1>
				<HSub>Subheading</HSub>
				<HSub
					><Small>Published on <DataTime datetime="2000-01-01">January 1st, 2000</DataTime></Small
					></HSub
				>
			</Hgroup>
		</Section>
		<Section>
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
			<P>{paragraph}<FootnoteLink id="one">one</FootnoteLink></P>
			<Image src="/img/placeholder/16_9.640x359.png" width="640" height="359" />
			<P>{paragraph}</P>
			<P>{paragraph}<FootnoteLink id="two">two</FootnoteLink></P>

			<Example component="table" />

			<P>{paragraph}</P>
			<P>{paragraph}<FootnoteLink id="three">three</FootnoteLink></P>
		</Section>
		<Section>
			<H2>Glossary</H2>
			<Dl>
				<Dt>Term</Dt>
				<Dd>description</Dd>
				<Dt>Term</Dt>
				<Dd>description</Dd>
				<Dt>Term</Dt>
				<Dd>description</Dd>
			</Dl>
		</Section>
		<Section>
			<Footnotes title="Footnotes" {footnotes} />
		</Section>
		<Section>
			<H2>Tags</H2>
			<A href="/layout/search?tag=tag" rel="tag">tag</A>, <A href="/layout/search?tag=tag" rel="tag"
				>tag</A
			>, <A href="/layout/search?tag=tag" rel="tag">tag</A>
		</Section>
	</Article>
	{#snippet suffix()}
		<Section>
			<H2>Related pages</H2>
			<Ul class="grid">
				<Card id="0">
					{#snippet children({ id })}
						<H3><A href="#" aria-describedby={id}>A card</A></H3>
						<P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
						<span aria-hidden="true" {id}>Read more</span>
					{/snippet}
					{#snippet img()}
						<Image alt="" src="/img/placeholder/16_9.640x359.png" width="640" height="359" />
					{/snippet}
				</Card>
				<Card id="1">
					{#snippet children({ id })}
						<H3><A href="#" aria-describedby={id}>Another card</A></H3>
						<P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
						<span aria-hidden="true" {id}>Read more</span>
					{/snippet}
					{#snippet img()}
						<Image alt="" src="/img/placeholder/16_9.640x359.png" width="640" height="359" />
					{/snippet}
				</Card>
			</Ul>
		</Section>
	{/snippet}
</LayoutCenter>
