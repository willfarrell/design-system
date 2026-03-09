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
		title: "Badge",
		update: "2025-05-01",
	};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Small inline label for displaying counts, statuses, or short descriptors" />
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
		<P>The Badge component displays a small label, typically used to show a count, status, or short descriptor. Badges are rendered as inline <code>&lt;span&gt;</code> elements with the <code>.badge</code> class.</P>
		<P>Use badges to highlight notification counts, item quantities, or status indicators. Avoid using badges for long text; use a Tag or Alert instead.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="badge" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Badges are rendered as <code>&lt;span&gt;</code> elements with no implicit ARIA role.</Li>
			<Li>Screen readers will read the badge text inline with surrounding content.</Li>
			<Li>For dynamic counts, consider wrapping the badge in an <code>aria-live</code> region so updates are announced.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2026/01/live-region-support.html">Live Region Support</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/tag">Tag</A> — for labelling and categorization with links</Li>
			<Li><A href="/text/alert">Alert</A> — for important messages that need user attention</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
