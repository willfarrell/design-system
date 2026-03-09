<script>
import Example from "@components/Example.svelte";
import Card from "@design-system/components/Card.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import FootnoteLink from "@design-system/components/FootnoteLink.svelte";
import Footnotes from "@design-system/components/Footnotes.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import H4 from "@design-system/components/Heading4.svelte";
import H5 from "@design-system/components/Heading5.svelte";
import H6 from "@design-system/components/Heading6.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import Image from "@design-system/components/Image.svelte";
import LayoutCenter from "@design-system/components/LayoutCenter.svelte";
import Table from "@design-system/components/Table.svelte";
import A from "@design-system/elements/a.svelte";
import Abbr from "@design-system/elements/abbr.svelte";
import Address from "@design-system/elements/address.svelte";
import Article from "@design-system/elements/article.svelte";
import B from "@design-system/elements/b.svelte";
import Blockquote from "@design-system/elements/blockquote.svelte";
import Button from "@design-system/elements/button.svelte";
import Caption from "@design-system/elements/caption.svelte";
import Cite from "@design-system/elements/cite.svelte";
import Code from "@design-system/elements/code.svelte";
import Col from "@design-system/elements/col.svelte";
import Colgroup from "@design-system/elements/colgroup.svelte";
import Dd from "@design-system/elements/dd.svelte";
import Del from "@design-system/elements/del.svelte";
import Dl from "@design-system/elements/dl.svelte";
import Dt from "@design-system/elements/dt.svelte";
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
import Sup from "@design-system/elements/sup.svelte";
import Tbody from "@design-system/elements/tbody.svelte";
import Td from "@design-system/elements/td.svelte";
import Tfoot from "@design-system/elements/tfoot.svelte";
import Th from "@design-system/elements/th.svelte";
import Thead from "@design-system/elements/thead.svelte";
import Tr from "@design-system/elements/tr.svelte";
import U from "@design-system/elements/u.svelte";
import Ul from "@design-system/elements/ul.svelte";
import Var from "@design-system/elements/var.svelte";
import { paragraph } from "@examples/index.js";

const footnotes = [
	{ id: "one", value: "first footnote" },
	{ id: "two", value: "second footnote" },
	{ id: "three", value: "third footnote" },
];
</script>

<svelte:head>
	<title>Article | Layout | Design System</title>
	<meta name="description" content="A semantic fluid design system" />
</svelte:head>

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
				<Li><Card id="0">
					{#snippet children({ id })}
						<H3><A href="#" aria-describedby={id}>A card</A></H3>
						<P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
						<span aria-hidden="true" {id}>Read more</span>
					{/snippet}
					{#snippet img()}
						<Image alt="" src="/img/placeholder/16_9.640x359.png" width="640" height="359" />
					{/snippet}
				</Card></Li>
				<Li><Card id="1">
					{#snippet children({ id })}
						<H3><A href="#" aria-describedby={id}>Another card</A></H3>
						<P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
						<span aria-hidden="true" {id}>Read more</span>
					{/snippet}
					{#snippet img()}
						<Image alt="" src="/img/placeholder/16_9.640x359.png" width="640" height="359" />
					{/snippet}
				</Card></Li>
			</Ul>
		</Section>
	{/snippet}
</LayoutCenter>
