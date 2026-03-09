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
	title: "Headings",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Headings (h1-h6) create a document outline for visual and assistive technology users. Use a single h1 per page and maintain logical heading hierarchy." />
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
		<P>Headings (h1-h6) create a document outline for both visual and assistive technology users. Use a single h1 per page and maintain a logical heading hierarchy without skipping levels.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="headings" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Each heading level (h1-h6) has an implicit ARIA role of <Code>heading</Code> with an <Code>aria-level</Code> matching the number.</Li>
			<Li>Screen reader users rely on heading structure for navigation — roughly 82% use headings to find content.</Li>
			<Li>Use a single <Code>&lt;h1&gt;</Code> per page. The HTML5 document outline algorithm was never implemented by any browser or assistive technology.</Li>
			<Li>Do not skip heading levels (e.g. h2 to h4). Assistive technology may announce gaps as missing content.</Li>
			<Li>Avoid heading levels above h6. Browser and screen reader support for <Code>aria-level</Code> above 6 is inconsistent.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2024/05/level-setting-heading-levels.html">Level-Setting Heading Levels</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2013/12/the-truth-about-truth-about-multiple-h1.html">The Truth about Multiple H1 Tags</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html">There Is No Document Outline Algorithm</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/heading-group">Heading group</A> — for pairing headings with subtitles</Li>
			<Li><A href="/text/paragraph">Paragraphs</A> — for body content within sections</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>Set the size of headings</P>
		<!-- <Variable component="h2" />
		<Variable component="h3" />
		<Variable component="h4" />
		<Variable component="h5" />
		<Variable component="h6" /> -->
	</Section>
</LayoutTableOfContents>
