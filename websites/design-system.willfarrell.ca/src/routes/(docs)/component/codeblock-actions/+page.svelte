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
	title: "Codeblock actions",
	update: "2026-09-13",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Adds copy to clipboard and download buttons to a block of preformatted text" />
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
		<P>Write a plain <Code>&lt;pre&gt;&lt;code&gt;</Code> block and mark it up as <Code>&lt;pre is="ds-codeblock-actions"&gt;</Code>. The component prepends a button that writes the text content of the nested <Code>&lt;code&gt;</Code> element to the clipboard. Without JavaScript the block still renders as preformatted text, only the button is missing, so nothing is lost.</P>
		<P>Use it for anything a reader is expected to paste elsewhere: install commands, configuration snippets, tokens, identifiers. It pairs with the <A href="/component/codeblock">Codeblock</A> component, which wraps its highlighted code in this same element.</P>
		<P>Add a bare <Code>data-filename</Code> for the download variant. A second control joins the copy button in the corner and saves the block as a file. Use it when the block is long enough that pasting is the wrong verb: a config file, a certificate, a manifest.</P>
		<P>The contents come from the markup already there, the text of the nested <Code>&lt;code&gt;</Code>, saved as <Code>code.txt</Code>. Give <Code>data-filename</Code> a value to name the file something else.</P>
		<P>Neither control implements its own behaviour: the component builds a <A href="/component/copy-download">ds-copy and ds-download</A> button and points each at the nested <Code>&lt;code&gt;</Code> with <Code>data-elem="code"</Code>, which resolves within the block itself, so the clipboard and file handling live in one place and a block that changes after load still copies what it shows.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="codeblock-actions" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The control is a native <Code>&lt;button type="button"&gt;</Code>, so it is reachable by keyboard and activated with Enter or Space.</Li>
			<Li>The icon is <Code>aria-hidden="true"</Code> and <Code>focusable="false"</Code>; the accessible name comes from a visually hidden label.</Li>
			<Li>That label is an <Code>aria-live="polite"</Code> region that switches from <q>Copy</q> to <q>Copied</q> for two seconds, so success is announced rather than shown only in colour.</Li>
			<Li>The button is prepended in the DOM so it is announced before the code it copies, and moved to the inline end corner visually with <Code>order</Code>.</Li>
			<Li>Both controls are prepended ahead of the value, so they are announced before it; the inline end floats then paint copy in the corner with download beside it.</Li>
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
			<Li><Code>data-icon</Code> — sprite for both controls, defaults to <Code>/img/icons.svg#copy</Code>; the fragment is swapped per control, so <Code>#download</Code> is read from the same file</Li>
			<Li><Code>data-i18n-copy</Code> — idle label, defaults to <Code>Copy</Code></Li>
			<Li><Code>data-i18n-copied</Code> — confirmation label, defaults to <Code>Copied</Code></Li>
			<Li><Code>data-filename</Code> — present, renders the download control; its value names the file, defaults to <Code>code.txt</Code></Li>
			<Li><Code>data-i18n-download</Code> — download label, defaults to <Code>Download</Code></Li>
		</Ul>
	</Section>
</LayoutTableOfContents>
