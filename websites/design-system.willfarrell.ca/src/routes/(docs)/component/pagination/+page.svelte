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
	title: "Pagination",
	update: "2026-10-13",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Previous, next and numbered links for moving between pages of results" />
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
		<P>The Pagination component links to the previous page, the next page, and numbered pages of a long list of results. It renders plain links, so it works without JavaScript.</P>
		<P>Pass <code>current</code>, <code>total</code>, and <code>href</code>. <code>href</code> is a template such as <code>?page=&lbrace;n&rbrace;</code> or a function that takes a page number and returns a URL. Long ranges collapse to the first page, the last page, and the pages either side of the current one.</P>
		<P>Previous is left out on the first page and Next on the last page. Change the text with <code>labelPrevious</code>, <code>labelNext</code>, and <code>labelPage</code>.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="pagination" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The links sit in a <code>&lt;nav aria-label="Pagination"&gt;</code> landmark, so screen reader users can jump to it.</Li>
			<Li>The current page link has <code>aria-current="page"</code>, and is bold and underlined.</Li>
			<Li>Numbered links include visually hidden text, so they read as "Page 2" instead of "2".</Li>
			<Li>Previous and Next carry <code>rel="prev"</code> and <code>rel="next"</code>. Missing ones are left out, never shown as disabled links.</Li>
			<Li>Every link is at least 44 by 44 CSS pixels.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://design-system.service.gov.uk/components/pagination/">Pagination</A> — GOV.UK Design System</Li>
			<Li><A href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html">Understanding Target Size (Enhanced)</A> — W3C</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/links">Links</A> — for general-purpose navigation</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
