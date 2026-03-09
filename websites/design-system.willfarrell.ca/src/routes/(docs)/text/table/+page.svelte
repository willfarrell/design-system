<script>
import Snippet from "@components/Snippet.svelte";
import Variable from "@components/Variable.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import H4 from "@design-system/components/Heading4.svelte";
import H5 from "@design-system/components/Heading5.svelte";
import H6 from "@design-system/components/Heading6.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import Image from "@design-system/components/Image.svelte";
import LayoutTableOfContents from "@design-system/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@design-system/components/NavScrollspy.svelte";
import A from "@design-system/elements/a.svelte";
import Abbr from "@design-system/elements/abbr.svelte";
import Address from "@design-system/elements/address.svelte";
import B from "@design-system/elements/b.svelte";
import Blockquote from "@design-system/elements/blockquote.svelte";
import Button from "@design-system/elements/button.svelte";
import Cite from "@design-system/elements/cite.svelte";
import Code from "@design-system/elements/code.svelte";
import Del from "@design-system/elements/del.svelte";
import Details from "@design-system/elements/details.svelte";
import Em from "@design-system/elements/em.svelte";
import Footer from "@design-system/elements/footer.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import I from "@design-system/elements/i.svelte";
import Img from "@design-system/elements/img.svelte";
import Ins from "@design-system/elements/ins.svelte";
import Kbd from "@design-system/elements/kbd.svelte";
import Li from "@design-system/elements/li.svelte";
import Mark from "@design-system/elements/mark.svelte";
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
