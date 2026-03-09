<script>
import Snippet from "@components/Snippet.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import LayoutTableOfContents from "@design-system/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@design-system/components/NavScrollspy.svelte";
import A from "@design-system/elements/a.svelte";
import Code from "@design-system/elements/code.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import Li from "@design-system/elements/li.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Ul from "@design-system/elements/ul.svelte";

const page = {
	group: "Component",
	title: "DataTime",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Formats date and time values using Intl.DateTimeFormat with a semantic time element" />
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
		<P>The DataTime component formats date and time values using <Code>Intl.DateTimeFormat</Code>, rendering a <Code>&lt;time&gt;</Code> element with locale-aware formatting. It supports all DateTimeFormat options such as <Code>dateStyle</Code> and <Code>timeStyle</Code>.</P>
		<P>Use DataTime for displaying publication dates, event times, or any temporal data. The default format uses <Code>dateStyle: 'long'</Code>.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="data-time" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Renders as a <Code>&lt;time&gt;</Code> element with the machine-readable datetime preserved in the <Code>datetime</Code> attribute</Li>
			<Li>Screen readers announce the human-readable formatted date</Li>
			<Li>The semantic <Code>&lt;time&gt;</Code> element helps assistive technologies understand the content as temporal data</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/data-number">DataNumber</A> — for numeric formatting</Li>
			<Li><A href="/component/data-enum">DataEnum</A> — for mapping values to labels</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
