<script>
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import LayoutTableOfContents from "@willfarrell-ds/svelte/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@willfarrell-ds/svelte/components/NavScrollspy.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Header from "@willfarrell-ds/svelte/elements/header.svelte";
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
		<P>The Icon component renders an SVG icon from a sprite sheet using the <Code>&lt;use&gt;</Code> element. Icons are decorative by default with <Code>aria-hidden="true"</Code>. Pass <Code>alt</Code> to make an icon meaningful: it then renders with <Code>role="img"</Code> and <Code>aria-label</Code> set to the <Code>alt</Code> text.</P>
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
			<Li>Icons with an <Code>alt</Code> prop get <Code>role="img"</Code> and an <Code>aria-label</Code> from the <Code>alt</Code> text, so screen readers announce them as images.</Li>
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
