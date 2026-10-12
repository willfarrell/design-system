<script>
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import LayoutTableOfContents from "@willfarrell-ds/svelte/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@willfarrell-ds/svelte/components/NavScrollspy.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
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
	title: "Codeblock",
	update: "2026-09-13",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Syntax-highlighted block of code with download and copy to clipboard buttons" />
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
		<P>The Codeblock component displays a multi-line block of code with syntax highlighting, a download link, and a copy to clipboard button. Code is rendered inside <code>&lt;pre&gt;&lt;code&gt;</code> elements and tokenized with <A href="https://prismjs.com">PrismJS</A>. One file per language is loaded on demand, named for what a call site writes in <code>language</code>: <code>js</code>, <code>ts</code>, <code>css</code>, <code>html</code>, <code>xml</code>, <code>json</code>, <code>yaml</code>, <code>ini</code>, <code>properties</code>, <code>sh</code>, <code>sql</code>, <code>rust</code>, <code>php</code>, <code>python</code>, <code>ruby</code>, <code>graphql</code>, <code>nginx</code>, <code>apache</code>, <code>docker</code>, <code>csv</code>, <code>uri</code>, <code>regex</code>, <code>dns</code> and <code>http</code>.</P>
		<P><code>dns</code> and <code>http</code> read a record or a header value on its own, with no owner name or header name in front of it, which is the form a DNS provider's field or a scan report shows. Both colour the names, numbers and quoted values, and leave a bare value plain, because a grammar that does not know the spec cannot vouch for it.</P>
		<P>Each record and header that defines a fixed set of values has a variant that knows it, <code>dns-dmarc</code>, <code>dns-spf</code>, <code>dns-dkim</code>, <code>dns-mta-sts</code>, <code>dns-tls-rpt</code>, <code>dns-bimi</code>, <code>dns-caa</code>, <code>http-csp</code>, <code>http-hsts</code>, <code>http-hpkp</code>, <code>http-coop</code>, <code>http-coep</code>, <code>http-corp</code>, <code>http-dip</code>, <code>http-referrer</code>, <code>http-frame-options</code>, <code>http-content-type-options</code>, <code>http-cross-domain-policies</code>, <code>http-download-options</code> and <code>http-integrity-policy</code>. A value the spec defines is coloured as a keyword; anything else stays plain, so a typo or a value borrowed from another spec shows up as unhighlighted rather than passing for correct.</P>
		<P>Use it for standalone code samples and snippets. For a short code reference within a sentence, use the inline <code>&lt;code&gt;</code> element instead.</P>
		<P>Both controls float to the inline end, copy in the corner and download beside it. The file saved is <code>code.txt</code>; pass <code>filename</code> to name it something else, <code>filename="app.js"</code>.</P>
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
			<Li>The download control is a native <code>&lt;button&gt;</code> with its own visually hidden label, reachable by keyboard on the same terms as the copy button.</Li>
			<Li>Token colors derive their lightness from the theme so contrast holds in both light and dark mode.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/inline-format">Inline format</A> — for short inline code references</Li>
			<Li><A href="/component/codeblock-actions">Codeblock actions</A> — the element that carries the download and copy controls</Li>
			<Li><A href="/component/icon">Icon</A> — used for the button glyphs</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Ul>
			<Li><code>--code-comment</code></Li>
			<Li><code>--code-punctuation</code></Li>
			<Li><code>--code-deleted</code></Li>
			<Li><code>--code-inserted</code></Li>
			<Li><code>--code-number</code></Li>
			<Li><code>--code-operator</code></Li>
			<Li><code>--code-keyword</code></Li>
			<Li><code>--code-function</code></Li>
			<Li><code>--code-variable</code></Li>
			<Li><code>--lightness-code</code></Li>
		</Ul>
	</Section>
</LayoutTableOfContents>
