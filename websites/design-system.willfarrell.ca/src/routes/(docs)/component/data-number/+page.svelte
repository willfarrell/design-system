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
	title: "DataNumber",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Formats numeric values with locale-aware decimal separators, currency, and percentage styles" />
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
					<Li><A href="#related">Related</A></Li>
					<Li><A href="#variables">Variables</A></Li>
				</Ol>
		{/snippet}

		</NavScrollspy>
	{/snippet}
	<Section>
		<H2 id="description">Description</H2>
		<P>The DataNumber component formats numeric values using <Code>Intl.NumberFormat</Code>, supporting locale-aware decimal separators, currency, and percentage styles.</P>
		<P>Use DataNumber for displaying prices, statistics, or any numeric value that benefits from locale-aware formatting. For file sizes, use <A href="/component/data-bytes">DataBytes</A> instead.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="data-number" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Renders as a <Code>&lt;data&gt;</Code> element with the raw value preserved in the <Code>value</Code> attribute</Li>
			<Li>Screen readers announce the formatted number text</Li>
			<Li>Supports <Code>Intl.NumberFormat</Code> options like <Code>style</Code>, <Code>currency</Code>, and <Code>minimumFractionDigits</Code></Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/data-bytes">DataBytes</A> — for file size formatting</Li>
			<Li><A href="/component/data-time">DataTime</A> — for date formatting</Li>
			<Li><A href="/component/data-enum">DataEnum</A> — for mapping values to labels</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
