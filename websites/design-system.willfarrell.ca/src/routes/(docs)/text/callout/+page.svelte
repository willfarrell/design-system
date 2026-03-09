<script>
import Snippet from "@components/Snippet.svelte";
import Variable from "@components/Variable.svelte";
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
	group: "Text",
	title: "Callout",
	update: "2026-01-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="A callout highlights supplementary information within page content. Unlike alerts, callouts are static and not announced via live regions." />
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
		<P>A callout highlights supplementary information within page content. Unlike alerts, callouts are not announced by screen readers via live regions — they are static content.</P>
		<P>Use callouts for tips, notes, warnings, or additional context that supplements the surrounding content.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="callout" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Callouts are typically <Code>&lt;aside&gt;</Code> or styled <Code>&lt;div&gt;</Code> elements with no implicit ARIA role that triggers announcements.</Li>
			<Li>Do not use <Code>role="alert"</Code> on callouts — they are not time-sensitive and would interrupt screen reader users unnecessarily.</Li>
			<Li>Ensure sufficient color contrast for callout backgrounds and borders. Do not rely on color alone to convey the callout type (e.g. warning vs info).</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/alert">Alert</A> — for urgent, time-sensitive messages</Li>
			<Li><A href="/text/blockquote">Blockquote</A> — for attributed quotations</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for callout</P>
	</Section>
</LayoutTableOfContents>
