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
	title: "Breadcrumb",
	update: "2026-10-13",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Trail of links from the home page to the current page" />
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
		<P>The Breadcrumb component lists the pages between the home page and the current page. Pass <code>items</code> as an array of <code>{"{ href, text }"}</code> objects, ordered from the home page to the current page.</P>
		<P>Use a breadcrumb on sites with three or more levels of hierarchy. Place it before the <code>&lt;h1&gt;</code>.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="breadcrumb" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The list sits in a <code>&lt;nav&gt;</code> landmark named "Breadcrumb". Set <code>label</code> to translate the name.</Li>
			<Li>The links are in an <code>&lt;ol&gt;</code>, so screen readers announce the number of levels.</Li>
			<Li>The last link has <code>aria-current="page"</code>, so screen readers announce it as the current page.</Li>
			<Li>CSS draws the separators. Screen readers skip them, and they flip in right-to-left languages.</Li>
			<Li>Each link is at least 44 by 44 pixels.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/">Breadcrumb Pattern</A> — WAI-ARIA Authoring Practices Guide</Li>
			<Li><A href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html">Understanding Target Size (Enhanced)</A> — W3C</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/links">Links</A> — for general-purpose navigation</Li>
			<Li><A href="/component/scrollspy">Scrollspy</A> — for navigation within a page</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
