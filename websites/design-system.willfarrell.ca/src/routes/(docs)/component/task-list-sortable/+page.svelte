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
	title: "Task list (sortable)",
	update: "2026-10-10",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="A task list with a sort control that reorders rows in the browser by machine-readable sort keys." />
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
		<P>A sortable task list adds a sort select, and an optional add link, above a <A href="/component/task-list">Task list</A>. The <Code>ds-task-sortable</Code> web component listens for changes on the select and reorders the rows by their <Code>data-sort-*</Code> attributes.</P>
		<P>The first option must be the order the server already rendered. Without JavaScript the list still shows in that order, only the select does nothing.</P>
		<P>Each option value names a sort key; prefix it with <Code>-</Code> for descending. Give rows machine values to sort by, such as epoch milliseconds or ordinals, rather than the localized text they display.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="task-list-sortable" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The select has no visible label; <Code>aria-label</Code> names the collapsed control and the <Code>&lt;optgroup&gt;</Code> label repeats it when the list is open.</Li>
			<Li>Reordering moves the existing <Code>&lt;li&gt;</Code> nodes, so focus and any state on a row are kept.</Li>
			<Li>Each row keeps a single click target; the controls sit outside the list.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#customized_built-in_elements">Customized built-in elements</A> — MDN</Li>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator">Intl.Collator</A> — MDN</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/task-list">Task list</A> — the same rows without sorting</Li>
			<Li><A href="/text/table">Table</A> — for sortable data with several columns</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Ul>
			<Li><Code>tasks</Code> — rows, as for Task list, with a <Code>sort</Code> object rendered as <Code>data-sort-*</Code></Li>
			<Li><Code>sorts</Code> — the options, each with a <Code>value</Code> and a <Code>label</Code></Li>
			<Li><Code>sortLabel</Code> — defaults to <Code>Sort by</Code></Li>
			<Li><Code>addHref</Code> and <Code>addLabel</Code> — optional add link</Li>
		</Ul>
	</Section>
</LayoutTableOfContents>
