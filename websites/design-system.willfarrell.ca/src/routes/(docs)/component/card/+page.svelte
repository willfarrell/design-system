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
				title: "Card",
				update: "2025-05-01",
			};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Visual container grouping related content and actions with preview, heading, and call-to-action" />
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
		<P>The Card component groups related content and actions into a single visual container. Cards typically display a preview image, heading, short description, and a call-to-action link.</P>
		<P>Use cards when presenting collections of similar items such as articles, products, or features. Avoid cards for single items where a simpler layout would suffice.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="card" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The card heading contains the primary link, making the entire card purpose clear to screen readers.</Li>
			<Li>The call-to-action text uses <code>aria-describedby</code> to associate it with the card, and <code>aria-hidden="true"</code> to avoid duplicate announcements.</Li>
			<Li>Images should include meaningful <code>alt</code> text or an empty <code>alt=""</code> for decorative images.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html">Block Links, Cards, Clickable Regions, Etc.</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2025/01/dont-wrap-figure-in-a-link.html">Don't Wrap Figure in a Link</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/links">Links</A> — for standalone navigation without card styling</Li>
			<Li><A href="/component/dialog">Dialog</A> — for modal content that requires user attention</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
