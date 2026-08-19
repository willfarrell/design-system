<script>
import Snippet from "@components/Snippet.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import LayoutTableOfContents from "@design-system/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@design-system/components/NavScrollspy.svelte";
import A from "@design-system/elements/a.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import Li from "@design-system/elements/li.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Ul from "@design-system/elements/ul.svelte";

const page = {
	group: "Component",
	title: "Codeblock",
	update: "2026-07-20",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Syntax-highlighted block of code with a copy to clipboard button" />
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
					<Li><A href="#related">Related</A></Li>
					<Li><A href="#variables">Variables</A></Li>
				</Ol>
		{/snippet}

		</NavScrollspy>
	{/snippet}
	<Section>
		<H2 id="description">Description</H2>
		<P>The Codeblock component displays a multi-line block of code with syntax highlighting and a copy to clipboard button. Code is rendered inside <code>&lt;pre&gt;&lt;code&gt;</code> elements and tokenized with <A href="https://prismjs.com">PrismJS</A>. Supported languages: <code>js</code>, <code>css</code>, <code>html</code>, and <code>bash</code>.</P>
		<P>Use it for standalone code samples and snippets. For a short code reference within a sentence, use the inline <code>&lt;code&gt;</code> element instead.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="codeblock" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Code is rendered in <code>&lt;pre&gt;&lt;code&gt;</code> elements, preserving whitespace and line breaks for screen readers.</Li>
			<Li>The copy control is a native <code>&lt;button&gt;</code> with a visually hidden label that switches from <q>Copy</q> to <q>Copied</q> and is announced via <code>aria-live="polite"</code>.</Li>
			<Li>Token colors derive their lightness from the theme so contrast holds in both light and dark mode.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/inline-format">Inline format</A> — for short inline code references</Li>
			<Li><A href="/component/icon">Icon</A> — used for the copy button glyph</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Ul>
			<Li><code>--code-comment</code></Li>
			<Li><code>--code-punctuation</code></Li>
			<Li><code>--code-deleted</code></Li>
			<Li><code>--code-inserted</code></Li>
			<Li><code>--code-operator</code></Li>
			<Li><code>--code-keyword</code></Li>
			<Li><code>--code-function</code></Li>
			<Li><code>--code-variable</code></Li>
			<Li><code>--lightness-code</code></Li>
		</Ul>
	</Section>
</LayoutTableOfContents>
