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
	group: "Form",
	title: "Errors",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Form errors communicate validation failures to users, associated with fields programmatically and announced via live regions." />
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
		<P>Form errors communicate validation failures to users. Errors should be associated with their fields programmatically and announced to screen readers via live regions.</P>
		<P>Avoid relying on browser default validation — it has significant accessibility and usability gaps.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="form-errors" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Use <Code>aria-describedby</Code> linking fields to their error messages. It has more reliable cross-platform support than <Code>aria-errormessage</Code>.</Li>
			<Li>Set <Code>aria-invalid="true"</Code> only after a validation attempt — never on initial page load.</Li>
			<Li>Error messages should use <Code>aria-live="polite"</Code> (not <Code>assertive</Code>) to preserve field name announcements.</Li>
			<Li>Error IDs follow the pattern <Code>{'{id}'}-error</Code>. Hint IDs follow <Code>{'{id}'}-hint</Code>. Build <Code>aria-describedby</Code> from both.</Li>
			<Li>Avoid default browser validation — error messages disappear, don't scale with zoom, and lack context. Use <Code>novalidate</Code> on forms.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2023/04/exposing-field-errors.html">Exposing Field Errors</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2019/02/avoid-default-field-validation.html">Avoid Default Field Validation</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2026/01/live-region-support.html">Live Region Support</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/alert">Alert</A> — for page-level error summaries</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for form errors</P>
	</Section>
</LayoutTableOfContents>
