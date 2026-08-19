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
	title: "Copy pre",
	update: "2026-08-18",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Adds a copy to clipboard button to a block of preformatted text" />
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
		<P>Write a plain <Code>&lt;pre&gt;&lt;code&gt;</Code> block and mark it up as <Code>&lt;pre is="ds-copy-pre"&gt;</Code>. The component prepends a button that writes the text content of the nested <Code>&lt;code&gt;</Code> element to the clipboard. Without JavaScript the block still renders as preformatted text, only the button is missing, so nothing is lost.</P>
		<P>Use it for anything a reader is expected to paste elsewhere: install commands, configuration snippets, tokens, identifiers. It pairs with the <A href="/component/codeblock">Codeblock</A> component, which wraps its highlighted code in this same element.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="copy-pre" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The control is a native <Code>&lt;button type="button"&gt;</Code>, so it is reachable by keyboard and activated with Enter or Space.</Li>
			<Li>The icon is <Code>aria-hidden="true"</Code> and <Code>focusable="false"</Code>; the accessible name comes from a visually hidden label.</Li>
			<Li>That label is an <Code>aria-live="polite"</Code> region that switches from <q>Copy</q> to <q>Copied</q> for two seconds, so success is announced rather than shown only in colour.</Li>
			<Li>The button is prepended in the DOM so it is announced before the code it copies, and moved to the inline end corner visually with <Code>order</Code>.</Li>
			<Li>Text and line breaks are preserved by <Code>&lt;pre&gt;</Code>, so what is announced matches what is copied.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText">Clipboard: writeText() method</A> — MDN</Li>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#customized_built-in_elements">Customized built-in elements</A> — MDN</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/codeblock">Codeblock</A> — for code samples that also need syntax highlighting</Li>
			<Li><A href="/component/icon">Icon</A> — used for the button glyph</Li>
			<Li><A href="/text/inline-format">Inline format</A> — for short code references within a sentence</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Ul>
			<Li><Code>data-icon</Code> — icon reference, defaults to <Code>/img/icons.svg#copy</Code></Li>
			<Li><Code>data-i18n-copy</Code> — idle label, defaults to <Code>Copy</Code></Li>
			<Li><Code>data-i18n-copied</Code> — confirmation label, defaults to <Code>Copied</Code></Li>
		</Ul>
	</Section>
</LayoutTableOfContents>
