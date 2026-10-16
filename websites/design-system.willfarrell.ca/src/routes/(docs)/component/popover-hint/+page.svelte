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
	title: "Popover hint",
	update: "2026-10-10",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="A popover using popover=hint, for supplementary content that does not close open auto popovers." />
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
		<P>A popover hint is a <A href="/component/popover">Popover</A> with <Code>popover="hint"</Code>. Opening a hint closes other hints but leaves open <Code>auto</Code> popovers alone, so a hint can explain a control inside a menu without dismissing the menu.</P>
		<P>Browsers without <Code>hint</Code> support treat it as <Code>manual</Code>, so the content still opens and closes with its trigger.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="popover-hint" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Open it with a <Code>&lt;button popovertarget&gt;</Code> so the trigger is keyboard operable and exposes its expanded state.</Li>
			<Li>Where <Code>hint</Code> is supported, Escape and clicking outside close it; elsewhere the trigger toggles it.</Li>
			<Li>Keep hint content short and non-interactive.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover">The popover attribute</A> — MDN</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/popover">Popover</A> — the default auto popover</Li>
			<Li><A href="/component/tooltip">Tooltip</A> — for a short label on hover or focus</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Ul>
			<Li><Code>id</Code> — referenced by the trigger in <Code>popovertarget</Code></Li>
			<Li><Code>children</Code> — the hint content</Li>
		</Ul>
	</Section>
</LayoutTableOfContents>
