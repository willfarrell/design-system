<script>
import Snippet from "@components/Snippet.svelte";
import Variable from "@components/Variable.svelte";
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
	group: "Text",
	title: "Heading group",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="The heading group (hgroup) pairs a heading with a subtitle or tagline. Only the heading element contributes to the document outline." />
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
		<P>The heading group (<Code>&lt;hgroup&gt;</Code>) pairs a heading with a subtitle or tagline. Only the heading element within the group contributes to the document outline.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="heading-group" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The <Code>&lt;hgroup&gt;</Code> element groups a heading with supplementary content (subtitle, tagline).</Li>
			<Li>Only the primary heading (h1-h6) within <Code>&lt;hgroup&gt;</Code> is exposed as a heading to assistive technology.</Li>
			<Li>The subtitle <Code>&lt;p&gt;</Code> is associated with the heading but does not create a separate heading level.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2024/05/level-setting-heading-levels.html">Level-Setting Heading Levels</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html">There Is No Document Outline Algorithm</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/headings">Headings</A> — for standalone headings</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>Set the size of heading</P>
		<!-- <Variable component="h1" /> -->
	</Section>
</LayoutTableOfContents>
