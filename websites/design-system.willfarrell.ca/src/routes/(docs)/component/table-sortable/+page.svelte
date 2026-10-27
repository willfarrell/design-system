<script>
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import LayoutTableOfContents from "@willfarrell-ds/svelte/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@willfarrell-ds/svelte/components/NavScrollspy.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Hgroup from "@willfarrell-ds/svelte/elements/hgroup.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Section from "@willfarrell-ds/svelte/elements/section.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import Snippet from "#components/Snippet.svelte";

const page = {
	group: "Component",
	title: "Table (sortable)",
	update: "2026-10-26",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="A table whose column headers sort the body rows in the browser by machine-readable cell values." />
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
		<P>A sortable table is a <A href="/text/table">Table</A> whose column headers sort the rows. The <Code>ds-table-sortable</Code> web component wraps each <Code>&lt;thead&gt;</Code> header in a button; activating it sorts every <Code>&lt;tbody&gt;</Code> by that column, ascending first, then toggling. <Code>&lt;tfoot&gt;</Code> rows stay where they are.</P>
		<P>Without JavaScript the table still shows in the order the server rendered, only the headers are not buttons.</P>
		<P>Cells sort by their text using a numeric, case-insensitive collator. When the displayed text is localized, give the cell a machine value with <Code>&lt;data value&gt;</Code>, <Code>&lt;time datetime&gt;</Code>, or a <Code>data-value</Code> attribute, so <Code>1,234</Code> sorts as 1234.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="table-sortable" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Each header becomes a native <Code>&lt;button&gt;</Code> inside the <Code>&lt;th&gt;</Code>, so it is keyboard operable and keeps the header's cell-to-header association.</Li>
			<Li>The sorted column gets <Code>aria-sort="ascending"</Code> or <Code>aria-sort="descending"</Code>; only one column carries it at a time.</Li>
			<Li>Reordering moves the existing <Code>&lt;tr&gt;</Code> nodes, so focus and any state on a row are kept.</Li>
			<Li>Use <Code>scope="col"</Code> and <Code>scope="row"</Code> as on any <A href="/text/table">Table</A>.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2021/04/sortable-table-columns.html">Sortable Table Columns</A> — Adrian Roselli</Li>
			<Li><A href="https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/">Sortable Table Example</A> — WAI-ARIA Authoring Practices</Li>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator">Intl.Collator</A> — MDN</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/table">Table</A> — the same table without sorting</Li>
			<Li><A href="/component/task-list-sortable">Task list (sortable)</A> — for sortable rows that each link somewhere</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
