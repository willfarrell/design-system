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
	title: "Card metric",
	update: "2026-10-10",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="A card that leads with a single formatted number and a short label explaining it." />
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
		<P>A card metric shows one number with a label underneath. Use it for dashboard summaries: counts, totals, scores. The number is formatted with <A href="/component/data-number">DataNumber</A>, so it follows the locale of the reader.</P>
		<P>Use a regular <A href="/component/card">Card</A> when the content needs a heading, a description or a link.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="card-metric" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The card is an <Code>&lt;article&gt;</Code> named by its label through <Code>aria-labelledby</Code>, so each metric is announced by what it measures.</Li>
			<Li>The number is a <Code>&lt;data&gt;</Code> element whose <Code>value</Code> carries the machine-readable figure.</Li>
			<Li>Pass a unique <Code>id</Code> per card so the generated label ids do not collide.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/data">The Data element</A> — MDN</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/card">Card</A> — for content with a heading and a link</Li>
			<Li><A href="/component/data-number">DataNumber</A> — the number formatter used inside</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Ul>
			<Li><Code>value</Code> — the number to show</Li>
			<Li><Code>id</Code> — used to build the label id</Li>
			<Li><Code>children</Code> — the label</Li>
		</Ul>
	</Section>
</LayoutTableOfContents>
