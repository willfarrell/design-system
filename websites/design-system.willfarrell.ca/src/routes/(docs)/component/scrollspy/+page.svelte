<script>
import Snippet from "@components/Snippet.svelte";
import Codeblock from "@design-system/components/Codeblock.svelte";
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
	title: "Scrollspy",
	update: "2026-07-20",
};

const usage = `<nav is="ds-scrollspy" aria-labelledby="toc-label">
  <section>
    <header><h2 id="toc-label">On this page</h2></header>
    <ol>
      <li><a href="#introduction">Introduction</a></li>
      <li><a href="#usage">Usage</a></li>
      <li><a href="#accessibility">Accessibility</a></li>
    </ol>
  </section>
</nav>

<section>
  <h2 id="introduction">Introduction</h2>
</section>
<section>
  <h2 id="usage">Usage</h2>
</section>
<section>
  <h2 id="accessibility">Accessibility</h2>
</section>`;
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Highlights the table of contents link for the section currently in view as the reader scrolls" />
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
					<Li><A href="#usage">Usage</A></Li>
					<Li><A href="#variants">Variants</A></Li>
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
		<P>A scrollspy highlights the navigation link for the section currently in view, giving the reader a persistent sense of place within a long document. It wraps a table of contents whose links are in-page anchors; as the reader scrolls, the link for the section in the top half of the viewport is marked as current.</P>
		<P>The pattern is progressive: with no scripting the navigation is still a plain list of working jump links. The <Code>ds-scrollspy</Code> web component lazy-loads and layers the active highlighting on top using an <Code>IntersectionObserver</Code>.</P>
		<P>This is a transitional implementation. The vanilla styles already set <Code>scroll-target-group: auto</Code> on the navigation and highlight the active link with the native <Code>:target-current</Code> selector. The JavaScript component only defines itself when <Code>CSS.supports("scroll-target-group", "auto")</Code> is false, so it removes itself automatically once native CSS scroll-target-group reaches baseline support.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="scrollspy" />
	</Section>
	<Section>
		<H2 id="usage">Usage</H2>
		<P>Wrap the table of contents in <Code>&lt;nav is="ds-scrollspy"&gt;</Code>. Each <Code>&lt;a href="#id"&gt;</Code> points at the <Code>id</Code> of a section heading, and every target section needs a matching <Code>&lt;h2 id&gt;</Code> so the observer can track it. The observer looks up <Code>section:has(h2[id])</Code> first, then falls back to any element carrying that <Code>id</Code>. A page opened at a <Code>#hash</Code>, and later <Code>hashchange</Code> events, set the active link too.</P>
		<Codeblock language="html" code={usage} />
		<P>In Svelte, use <Code>NavScrollspy</Code> with a <Code>children</Code> snippet holding the <Code>&lt;Ol&gt;</Code> of links. It accepts <Code>labelHeader</Code> (the heading text, default <q>On this page</q>), <Code>labelId</Code>, and <Code>is</Code> (default <Code>ds-scrollspy</Code>).</P>
	</Section>
	<Section>
		<H2 id="variants">Variants</H2>
		<P>Two implementations of the same <Code>ds-scrollspy</Code> element ship with the design system. Both register the same custom element name, so the behaviour is chosen by loading one implementation or the other, not by changing the <Code>is</Code> attribute.</P>
		<Ul>
			<Li><Code>ds-scrollspy</Code> — the default. It tracks every section independently, so more than one link can be current at once when several short sections share the top half of the viewport. Best for a long table of contents.</Li>
			<Li><Code>ds-scrollspy-single</Code> — keeps exactly one link current at a time, choosing the nearest heading from the scroll direction. Prefer it when a single active item reads more clearly, such as a short list.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The active link receives <Code>aria-current="true"</Code> and it is removed from the others, so assistive technology announces the section currently in view.</Li>
			<Li>The navigation is labelled with <Code>aria-labelledby</Code> pointing at its <q>On this page</q> heading, making it identifiable in a list of landmarks.</Li>
			<Li>Links are real in-page anchors, so they are keyboard focusable and operable with or without the script — the highlight is an enhancement, never a requirement for navigation.</Li>
			<Li>The default variant can mark several links current at once; prefer <Code>ds-scrollspy-single</Code> when a single announced location is less verbose.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://www.sarasoueidan.com/blog/css-scrollspy/">Pure CSS scroll-driven Scrollspy</A> — Sara Soueidan</Li>
			<Li><A href="https://www.nngroup.com/articles/table-of-contents/">Table of Contents in Long-Form Content</A> — Nielsen Norman Group</Li>
			<Li><A href="https://caniuse.com/wf-scroll-target-group">Can I use: scroll-target-group</A> — baseline tracking for the native replacement</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/layout/documentation">Documentation</A> — the two column layout that hosts the scrollspy in its aside</Li>
			<Li><A href="/text/links">Links</A> — the underlying in-page anchor pattern</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Ul>
			<Li><Code>labelHeader</Code></Li>
			<Li><Code>labelId</Code></Li>
			<Li><Code>is</Code></Li>
		</Ul>
	</Section>
</LayoutTableOfContents>
