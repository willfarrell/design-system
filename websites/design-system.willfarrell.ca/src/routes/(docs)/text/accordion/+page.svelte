<script>
import Snippet from "@components/Snippet.svelte";
import Variable from "@components/Variable.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import H4 from "@design-system/components/Heading4.svelte";
import H5 from "@design-system/components/Heading5.svelte";
import H6 from "@design-system/components/Heading6.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import Image from "@design-system/components/Image.svelte";
import LayoutTableOfContents from "@design-system/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@design-system/components/NavScrollspy.svelte";
import A from "@design-system/elements/a.svelte";
import Abbr from "@design-system/elements/abbr.svelte";
import Address from "@design-system/elements/address.svelte";
import B from "@design-system/elements/b.svelte";
import Blockquote from "@design-system/elements/blockquote.svelte";
import Button from "@design-system/elements/button.svelte";
import Cite from "@design-system/elements/cite.svelte";
import Code from "@design-system/elements/code.svelte";
import Del from "@design-system/elements/del.svelte";
import Details from "@design-system/elements/details.svelte";
import Em from "@design-system/elements/em.svelte";
import Footer from "@design-system/elements/footer.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import I from "@design-system/elements/i.svelte";
import Img from "@design-system/elements/img.svelte";
import Ins from "@design-system/elements/ins.svelte";
import Kbd from "@design-system/elements/kbd.svelte";
import Li from "@design-system/elements/li.svelte";
import Mark from "@design-system/elements/mark.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";
import S from "@design-system/elements/s.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Strong from "@design-system/elements/strong.svelte";
import Sub from "@design-system/elements/sub.svelte";
import Summary from "@design-system/elements/summary.svelte";
import Sup from "@design-system/elements/sup.svelte";
import U from "@design-system/elements/u.svelte";
import Ul from "@design-system/elements/ul.svelte";
import Var from "@design-system/elements/var.svelte";

const page = {
	group: "Text",
	title: "Accordion",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="An accordion groups related disclosure widgets so that opening one collapses the others using native details elements." />
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
					<Li><A href="#example-chevron">Example (with class)</A></Li>
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
		<P>An accordion groups related disclosure widgets so that opening one collapses the others. This design system uses native <Code>&lt;details&gt;</Code> elements with the <Code>name</Code> attribute for exclusive behavior.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="accordion" />
	</Section>
	<Section>
		<H2 id="example-chevron">Example (<Code>class="chevron"</Code>)</H2>
		<Snippet example="accordion-chevron" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Each <Code>&lt;summary&gt;</Code> acts as a button with browser-managed <Code>aria-expanded</Code> state.</Li>
			<Li>The accordion group should be wrapped in an element with <Code>role="group"</Code> for screen reader context.</Li>
			<Li><Code>&lt;summary&gt;</Code> neutralizes nested heading semantics. Content headings should be placed inside the revealed content, not in the summary.</Li>
			<Li>JavaScript is needed if you require keyboard shortcuts (e.g. Home/End) beyond the browser defaults.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2020/05/disclosure-widgets.html">Disclosure Widgets</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html">Details / Summary Are Not [insert control here]</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2023/03/css-only-widgets-are-inaccessible.html">CSS-only Widgets Are Inaccessible</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/details">Disclosure</A> — for standalone show/hide</Li>
			<Li><A href="/component/dialog">Dialog</A> — for modal content</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for accordion</P>
	</Section>
</LayoutTableOfContents>
