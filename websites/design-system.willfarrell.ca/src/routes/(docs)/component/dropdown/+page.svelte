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
	title: "Dropdown",
	update: "2026-08-20",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Disclosure menu of links using the native HTML popover attribute and CSS anchor positioning, no JavaScript required" />
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
		<P>The Dropdown component displays a list of links behind a toggle button. It uses the native HTML <Code>popover</Code> attribute with <Code>popovertarget</Code> for the button and CSS anchor positioning for placement, so it requires no JavaScript. The button label is set with the <Code>label</Code> prop, or replaced entirely with a <Code>button</Code> snippet for icon-only triggers. Remaining props are applied to the button; add <Code>class="chevron"</Code> for a chevron that rotates while open. The children snippet is the list itself.</P>
		<P>In browsers without CSS anchor positioning the dropdown still opens, closes, and light-dismisses; it renders at its position in the normal flow after the button, without collision avoidance.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="dropdown-nav" />
		<Snippet example="dropdown-item-list" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>This is the WAI disclosure navigation pattern: a button plus a plain list of links, not <Code>role="menu"</Code>, which would require JavaScript arrow-key handling.</Li>
			<Li>The browser sets <Code>aria-expanded</Code> on the <Code>popovertarget</Code> button automatically.</Li>
			<Li>Escape and light-dismiss close the dropdown, returning focus to the button.</Li>
			<Li>The list follows the button in source order, so Tab moves from the button into the links.</Li>
			<Li>Icon-only triggers must include a <Code>.visually-hidden</Code> label inside the <Code>button</Code> snippet.</Li>
			<Li>Never place a dropdown inside a larger click target. Rows that carry a dropdown use <A href="/component/item-list">ItemList</A> rather than a clickable Task list row, so a near-miss on the button cannot navigate away.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/">Disclosure Navigation Menu</A> — W3C WAI ARIA Authoring Practices</Li>
			<Li><A href="https://adrianroselli.com/2020/05/disclosure-widgets.html">Disclosure Widgets</A> — Adrian Roselli</Li>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning">CSS anchor positioning</A> — MDN</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/popover">Popover</A> — the underlying overlay primitive</Li>
			<Li><A href="/component/item-list">Item list</A> — non-clickable rows with a per-row dropdown</Li>
			<Li><A href="/text/details">Disclosure</A> — for inline expandable content</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
