<script>
		import Snippet from "@components/Snippet.svelte";
			import DataTime from "@design-system/components/DataTime.svelte";
			import H1 from "@design-system/components/Heading1.svelte";
			import H2 from "@design-system/components/Heading2.svelte";
			import HSub from "@design-system/components/HeadingSub.svelte";
			import LayoutTableOfContents from "@design-system/components/LayoutTableOfContents.svelte";
			import NavScrollspy from "@design-system/components/NavScrollspy.svelte";
			import A from "@design-system/elements/a.svelte";
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
				title: "Tag",
				update: "2025-05-01",
			};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Keyword or label rendered as a link for categorization and filtering" />
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
		<P>The Tag component renders a keyword or label as a link. Tags are commonly used for categorization, filtering, or tagging content with metadata.</P>
		<P>Use tags when content can be categorized or filtered by keyword. For non-interactive labels or counts, use a Badge instead.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="tag" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Tags are rendered as <code>&lt;a&gt;</code> elements, making them focusable and navigable by keyboard.</Li>
			<Li>Screen readers announce tags as links, with the tag text as the accessible name.</Li>
			<Li>Tags receive focus styles and can be activated with Enter or Space.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2016/06/on-link-underlines.html">On Link Underlines</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2024/01/styling-links-and-buttons.html">Styling Links and Buttons</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/badge">Badge</A> — for non-interactive status indicators and counts</Li>
			<Li><A href="/text/links">Links</A> — for general-purpose navigation</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
