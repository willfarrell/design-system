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
