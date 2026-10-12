<script>
import Codeblock from "@willfarrell-ds/svelte/components/Codeblock.svelte";
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
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The active link receives <Code>aria-current="true"</Code> and it is removed from the others, so assistive technology announces the section currently in view.</Li>
			<Li>The navigation is labelled with <Code>aria-labelledby</Code> pointing at its <q>On this page</q> heading, making it identifiable in a list of landmarks.</Li>
			<Li>Links are real in-page anchors, so they are keyboard focusable and operable with or without the script — the highlight is an enhancement, never a requirement for navigation.</Li>
			<Li>Several links can be current at once when short sections share the top half of the viewport.</Li>
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
