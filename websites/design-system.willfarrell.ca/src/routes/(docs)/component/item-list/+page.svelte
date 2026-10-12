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
	title: "Item list",
	update: "2026-08-20",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Task-list-style rows with a per-row dropdown of actions; rows are never clickable" />
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
		<P>The ItemList component renders rows styled like a <A href="/component/task-list">Task list</A>, each with an optional <A href="/component/dropdown">Dropdown</A> of actions behind a three-dot button. Each item takes <Code>id</Code>, <Code>label</Code>, <Code>href</Code>, optional <Code>status</Code>/<Code>tag</Code>/<Code>note</Code>, and a <Code>menu</Code> array of links; the <Code>icon</Code> prop overrides the three-dot sprite reference.</P>
		<P>Unlike Task list, rows are never clickable. A whole-row click target wrapping a button means a near-miss on the button navigates away, so a row either navigates as one surface (Task list) or holds controls (Item list) — never both.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="dropdown-item-list" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The three-dot button carries a <Code>.visually-hidden</Code> label naming its row ("Actions for …"), so buttons are distinguishable out of context.</Li>
			<Li>The dropdown inherits its behavior from the Dropdown component: native <Code>popover</Code>, <Code>aria-expanded</Code> managed by the browser, Escape and light-dismiss, no JavaScript.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/task-list">Task list</A> — clickable rows without embedded controls</Li>
			<Li><A href="/component/dropdown">Dropdown</A> — the per-row action menu</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
