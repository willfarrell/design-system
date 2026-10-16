<script>
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import H3 from "@willfarrell-ds/svelte/components/Heading3.svelte";
import H4 from "@willfarrell-ds/svelte/components/Heading4.svelte";
import H5 from "@willfarrell-ds/svelte/components/Heading5.svelte";
import H6 from "@willfarrell-ds/svelte/components/Heading6.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import Image from "@willfarrell-ds/svelte/components/Image.svelte";
import LayoutTableOfContents from "@willfarrell-ds/svelte/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@willfarrell-ds/svelte/components/NavScrollspy.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Abbr from "@willfarrell-ds/svelte/elements/abbr.svelte";
import Address from "@willfarrell-ds/svelte/elements/address.svelte";
import B from "@willfarrell-ds/svelte/elements/b.svelte";
import Blockquote from "@willfarrell-ds/svelte/elements/blockquote.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Cite from "@willfarrell-ds/svelte/elements/cite.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Del from "@willfarrell-ds/svelte/elements/del.svelte";
import Details from "@willfarrell-ds/svelte/elements/details.svelte";
import Em from "@willfarrell-ds/svelte/elements/em.svelte";
import Footer from "@willfarrell-ds/svelte/elements/footer.svelte";
import Hgroup from "@willfarrell-ds/svelte/elements/hgroup.svelte";
import I from "@willfarrell-ds/svelte/elements/i.svelte";
import Img from "@willfarrell-ds/svelte/elements/img.svelte";
import Ins from "@willfarrell-ds/svelte/elements/ins.svelte";
import Kbd from "@willfarrell-ds/svelte/elements/kbd.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Mark from "@willfarrell-ds/svelte/elements/mark.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import S from "@willfarrell-ds/svelte/elements/s.svelte";
import Section from "@willfarrell-ds/svelte/elements/section.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Strong from "@willfarrell-ds/svelte/elements/strong.svelte";
import Sub from "@willfarrell-ds/svelte/elements/sub.svelte";
import Summary from "@willfarrell-ds/svelte/elements/summary.svelte";
import Sup from "@willfarrell-ds/svelte/elements/sup.svelte";
import U from "@willfarrell-ds/svelte/elements/u.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import Var from "@willfarrell-ds/svelte/elements/var.svelte";
import Snippet from "#components/Snippet.svelte";
import Variable from "#components/Variable.svelte";

const page = {
	group: "Text",
	title: "Links",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Links navigate the user to a new page or resource. Use anchor elements for navigation, never buttons or divs." />
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
					<Li><A href="#example-button">Example (button)</A></Li>
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
		<P>Links navigate the user to a new page or resource. Use <Code>&lt;a href&gt;</Code> for navigation — never <Code>&lt;button&gt;</Code> or <Code>&lt;div&gt;</Code>. Links styled as buttons should still be anchor elements.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="link" />
	</Section>
	<Section>
		<H2 id="example-button">Example (button)</H2>
		<Snippet example="link-button" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Links must be underlined in body text. WCAG 1.4.1 requires visual distinction beyond color alone.</Li>
			<Li>Links activate on Enter; buttons activate on Enter and Space. Using the wrong element breaks keyboard expectations.</Li>
			<Li>Do not use <Code>aria-label</Code> on links — it is not translated by browser translation services and is ignored by read-aloud tools.</Li>
			<Li>Do not wrap <Code>&lt;figure&gt;</Code> elements in links or split link text across multiple elements.</Li>
			<Li>Use <Code>aria-current="page"</Code> on links matching the current page.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2016/06/on-link-underlines.html">On Link Underlines</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2016/01/links-buttons-submits-and-divs-oh-hell.html">Links, Buttons, Submits, and Divs, Oh Hell</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2023/08/styling-links-and-buttons.html">Styling Links and Buttons</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2026/01/barriers-from-links-with-aria.html">Barriers from Links with ARIA</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/form/buttons">Buttons</A> — for in-page actions</Li>
			<Li><A href="/component/tag">Tag</A> — for category links</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for links</P>
	</Section>
</LayoutTableOfContents>
