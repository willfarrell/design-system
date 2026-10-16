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
import LayoutTableOfContents from "@willfarrell-ds/svelte/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@willfarrell-ds/svelte/components/NavScrollspy.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Abbr from "@willfarrell-ds/svelte/elements/abbr.svelte";
import Address from "@willfarrell-ds/svelte/elements/address.svelte";
import B from "@willfarrell-ds/svelte/elements/b.svelte";
import Blockquote from "@willfarrell-ds/svelte/elements/blockquote.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Cite from "@willfarrell-ds/svelte/elements/cite.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Del from "@willfarrell-ds/svelte/elements/del.svelte";
import Details from "@willfarrell-ds/svelte/elements/details.svelte";
import Em from "@willfarrell-ds/svelte/elements/em.svelte";
import Footer from "@willfarrell-ds/svelte/elements/footer.svelte";
import Hgroup from "@willfarrell-ds/svelte/elements/hgroup.svelte";
import I from "@willfarrell-ds/svelte/elements/i.svelte";
import Img from "@willfarrell-ds/svelte/elements/img.svelte";
import Ins from "@willfarrell-ds/svelte/elements/ins.svelte";
import Kbd from "@willfarrell-ds/svelte/elements/kbd.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Mark from "@willfarrell-ds/svelte/elements/mark.svelte";
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
import Snippet from "#components/Snippet.svelte";
import Variable from "#components/Variable.svelte";

const page = {
	group: "Text",
	title: "Table",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Tables present tabular data in rows and columns. Use semantic HTML table elements with proper header associations." />
</svelte:head>

<LayoutTableOfContents>
	{#snippet header()}
		<Hgroup>
			<HSub>{page.group}</HSub>
			<H1>{page.title}</H1>
			<HSub><Small>Published on <DataTime datetime={page.update} /></Small></HSub>
		</Hgroup>
	{/snippet}
	{#snippet aside()}
		<NavScrollspy>
			{#snippet children()}
				<Ol>
					<Li><A href="#description">Description</A></Li>
					<Li><A href="#example">Example</A></Li>
					<Li><A href="#accessibility">Accessibility</A></Li>
					<Li><A href="#references">References</A></Li>
					<Li><A href="#related">Related</A></Li>
					<Li><A href="#variables">Variables</A></Li>
				</Ol>
		{/snippet}

		</NavScrollspy>
	{/snippet}
	<Section>
		<H2 id="description">Description</H2>
		<P>Tables present tabular data in rows and columns. Use semantic HTML table elements with proper header associations. It is absolutely fine to use tables for tabular data.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="table" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Use <Code>scope="col"</Code> on column headers and <Code>scope="row"</Code> on row headers for proper screen reader cell-to-header association.</Li>
			<Li>Include <Code>&lt;caption&gt;</Code> or <Code>aria-labelledby</Code> for table identification.</Li>
			<Li>Wrap tables in a scrollable container with <Code>role="region"</Code>, <Code>aria-labelledby</Code> (or <Code>aria-label</Code>), and <Code>tabindex="0"</Code> for keyboard-accessible scrolling.</Li>
			<Li>Do not use CSS <Code>display</Code> properties (flex, grid, block) on table elements — they strip table semantics. Use <Code>position: sticky</Code> for fixed headers instead.</Li>
			<Li>Do not convert tables to ARIA grids unless building a spreadsheet-like interface with 2D arrow-key navigation.</Li>
			<Li>Avoid spanning headers — they cause inconsistent screen reader announcements across all tested assistive technologies.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html">Under-Engineered Responsive Tables</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2017/11/hey-its-still-ok-to-use-tables.html">Hey, It's Still OK to Use Tables</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2018/02/tables-css-display-properties-and-aria.html">Tables, CSS Display Properties, and ARIA</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2020/01/fixed-table-headers.html">Fixed Table Headers</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2023/02/avoid-spanning-table-headers.html">Avoid Spanning Table Headers</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2023/11/dont-turn-a-table-into-an-aria-grid-just-for-a-clickable-row.html">Don't Turn a Table into an ARIA Grid Just for a Clickable Row</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/list-dl">Description list</A> — for key-value data</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
