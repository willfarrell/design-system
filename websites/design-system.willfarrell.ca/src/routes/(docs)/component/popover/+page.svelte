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
				title: "Popover",
				update: "2025-05-01",
			};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Non-modal overlay using the native HTML popover attribute with light-dismiss behaviour" />
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
		<P>The Popover component displays content in an overlay that appears on demand. It uses the native HTML <Code>popover</Code> attribute, which provides built-in light-dismiss behavior and top-layer rendering. A PopoverHint variant uses <Code>popover="hint"</Code> for tooltip-style overlays.</P>
		<P>Use popovers for supplemental content such as tooltips, menus, or additional details. For content that requires user acknowledgment, use a Dialog instead.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="popover" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The trigger button should use the <Code>popovertarget</Code> attribute to associate it with the popover element.</Li>
			<Li>Popovers are rendered in the top layer, ensuring they appear above all other content.</Li>
			<Li>Light-dismiss allows closing by clicking outside or pressing Escape.</Li>
			<Li>Focus management is handled natively by the browser.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2023/11/a-brief-note-on-popovers-with-dialogs.html">A Brief Note on Popovers with Dialogs</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2020/05/disclosure-widgets.html">Disclosure Widgets</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/dialog">Dialog</A> — for modal content that blocks interaction with the page</Li>
			<Li><A href="/text/details">Disclosure</A> — for inline expandable content</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
