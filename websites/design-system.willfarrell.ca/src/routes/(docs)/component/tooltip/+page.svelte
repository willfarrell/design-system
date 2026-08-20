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
	title: "Tooltip",
	update: "2026-08-18",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Progressive enhancement that upgrades native title attributes into styled hover popovers" />
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
		<P>Write a plain <Code>title</Code> attribute. The <Code>bootstrap/tooltip.js</Code> script replaces each one with a <Code>popover="hint"</Code> element anchored to the element it describes, shown on hover and on focus. Without JavaScript, or without CSS anchor positioning, the browser keeps rendering its own <Code>title</Code> tooltip, so nothing is lost.</P>
		<P>The tooltip renders above the element by default and moves below it, or toward the opposite inline edge, when the viewport runs out of room. It hides itself when the element it describes scrolls out of view.</P>
		<P>Use it for supplemental hints that repeat or clarify. Content that a user must read to complete a task belongs in the page, not in a tooltip. For overlays with interactive content, use a <A href="/component/popover">Popover</A>.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="tooltip" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The <Code>title</Code> stays on the element, so the accessible description is unchanged. It is emptied only while the pointer is over the element, which is what stops the browser drawing its own tooltip on top.</Li>
			<Li>The tooltip element is <Code>aria-hidden</Code>. It repeats the <Code>title</Code> visually and adds nothing for a screen reader to announce twice.</Li>
			<Li>Tooltips open on <Code>focus</Code> as well as hover, and <Code>abbr</Code> is given <Code>tabindex="0"</Code> so keyboard users can reach its expansion.</Li>
			<Li>Escape closes an open tooltip, it stays open while hovered, and it never times out, meeting <A href="https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html">WCAG 1.4.13</A>.</Li>
			<Li>A 400ms delay before showing avoids flashing tooltips while the pointer crosses the page.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://sarahmhigley.com/writing/tooltips-in-wcag-21/">Tooltips in the time of WCAG 2.1</A> — Sarah Higley</Li>
			<Li><A href="https://adrianroselli.com/2016/04/tooltips-and-toggletips.html">Tooltips &amp; Toggletips</A> — Adrian Roselli</Li>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning">CSS anchor positioning</A> — MDN</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/popover">Popover</A> — for overlays holding interactive content</Li>
			<Li><A href="/component/dialog">Dialog</A> — for modal content that blocks the page</Li>
			<Li><A href="/text/inline-format">Inline format</A> — for <Code>abbr</Code> and other inline semantics</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
