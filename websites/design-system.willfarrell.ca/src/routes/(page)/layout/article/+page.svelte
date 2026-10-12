<script>
import Card from "@willfarrell-ds/svelte/components/Card.svelte";
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import FootnoteLink from "@willfarrell-ds/svelte/components/FootnoteLink.svelte";
import Footnotes from "@willfarrell-ds/svelte/components/Footnotes.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import H3 from "@willfarrell-ds/svelte/components/Heading3.svelte";
import H4 from "@willfarrell-ds/svelte/components/Heading4.svelte";
import H5 from "@willfarrell-ds/svelte/components/Heading5.svelte";
import H6 from "@willfarrell-ds/svelte/components/Heading6.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import Image from "@willfarrell-ds/svelte/components/Image.svelte";
import LayoutCenter from "@willfarrell-ds/svelte/components/LayoutCenter.svelte";
import Table from "@willfarrell-ds/svelte/components/Table.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Abbr from "@willfarrell-ds/svelte/elements/abbr.svelte";
import Address from "@willfarrell-ds/svelte/elements/address.svelte";
import Article from "@willfarrell-ds/svelte/elements/article.svelte";
import B from "@willfarrell-ds/svelte/elements/b.svelte";
import Blockquote from "@willfarrell-ds/svelte/elements/blockquote.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Caption from "@willfarrell-ds/svelte/elements/caption.svelte";
import Cite from "@willfarrell-ds/svelte/elements/cite.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Col from "@willfarrell-ds/svelte/elements/col.svelte";
import Colgroup from "@willfarrell-ds/svelte/elements/colgroup.svelte";
import Dd from "@willfarrell-ds/svelte/elements/dd.svelte";
import Del from "@willfarrell-ds/svelte/elements/del.svelte";
import Dl from "@willfarrell-ds/svelte/elements/dl.svelte";
import Dt from "@willfarrell-ds/svelte/elements/dt.svelte";
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
import Sup from "@willfarrell-ds/svelte/elements/sup.svelte";
import Tbody from "@willfarrell-ds/svelte/elements/tbody.svelte";
import Td from "@willfarrell-ds/svelte/elements/td.svelte";
import Tfoot from "@willfarrell-ds/svelte/elements/tfoot.svelte";
import Th from "@willfarrell-ds/svelte/elements/th.svelte";
import Thead from "@willfarrell-ds/svelte/elements/thead.svelte";
import Tr from "@willfarrell-ds/svelte/elements/tr.svelte";
import U from "@willfarrell-ds/svelte/elements/u.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import Var from "@willfarrell-ds/svelte/elements/var.svelte";
import Example from "#components/Example.svelte";
import { paragraph } from "#examples/index.js";

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
