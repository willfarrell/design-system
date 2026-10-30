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
	title: "Download",
	update: "2026-10-29",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="A button that saves a value as a text file" />
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
		<P>Write the button you want, then mark it up as <Code>&lt;button is="ds-download"&gt;</Code>. It saves a value as a plain text file, named by <Code>data-filename</Code>. Without JavaScript the button is not upgraded, so give it nothing to do that the page cannot already do another way.</P>
		<P><Code>data-value</Code> carries the value directly; <Code>data-elem</Code> is a selector for the element holding it, read from <Code>value</Code> for a form control and trimmed text content for anything else. That selector is tried on the button's parent before the document, so a button sitting beside what it acts on says <Code>code</Code> or <Code>output</Code> and needs no id. <Code>data-value</Code> wins when both are set.</P>
		<P>Use it when the value is shown somewhere the reader can see, a DNS record, an API key, a header value, and the button sits beside it. To put the value on the clipboard instead, use <A href="/component/copy">Copy</A>. For a whole block of preformatted text that carries its own controls, use <A href="/component/codeblock-actions">Codeblock actions</A> instead.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="download" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>It is a native <Code>&lt;button&gt;</Code> element, so it is reachable by keyboard and activated with Enter or Space.</Li>
			<Li>The accessible name comes from the markup you write. Add <Code>class="visually-hidden"</Code> to the label for an icon-only button rather than dropping it.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#download">The download attribute</A> — MDN</Li>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#customized_built-in_elements">Customized built-in elements</A> — MDN</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/copy">Copy</A> — writes the same value to the clipboard</Li>
			<Li><A href="/component/codeblock-actions">Codeblock actions</A> — copy and download, built into a block of preformatted text</Li>
			<Li><A href="/component/codeblock">Codeblock</A> — for code samples that also need syntax highlighting</Li>
			<Li><A href="/form/buttons">Buttons</A> — for the button markup itself</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Ul>
			<Li><Code>data-value</Code> — the value, written literally</Li>
			<Li><Code>data-elem</Code> — selector for the element holding the value, resolved inside the button's parent first and then the document, used when <Code>data-value</Code> is absent</Li>
			<Li><Code>data-filename</Code> — file name, defaults to <Code>download.txt</Code></Li>
		</Ul>
	</Section>
</LayoutTableOfContents>
