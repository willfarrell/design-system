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
import Header from "@design-system/elements/header.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import Li from "@design-system/elements/li.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Ul from "@design-system/elements/ul.svelte";

const page = {
	group: "Component",
	title: "Icon",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="SVG icon from a sprite sheet using the use element, decorative by default" />
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
		<P>The Icon component renders an SVG icon from a sprite sheet using the <Code>&lt;use&gt;</Code> element. Icons are decorative by default with <Code>aria-hidden="true"</Code> and <Code>focusable="false"</Code>.</P>
		<P>Use icons alongside text labels to provide visual context. Avoid using icons as the sole means of conveying meaning without an accessible text alternative.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="icon" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Icons are set to <Code>aria-hidden="true"</Code> by default, hiding them from screen readers.</Li>
			<Li>Icons use <Code>focusable="false"</Code> to prevent focus in Internet Explorer and older Edge.</Li>
			<Li>Always pair icons with visible text or provide an accessible label on the parent element.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2020/10/alternative-text-for-css-generated-content.html">Alternative Text for CSS Generated Content</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2024/05/my-approach-to-alt-text.html">My Approach to Alt Text</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/badge">Badge</A> — for count or status indicators</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
