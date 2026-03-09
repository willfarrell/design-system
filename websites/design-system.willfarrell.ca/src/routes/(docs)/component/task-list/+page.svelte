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
	group: "Component",
	title: "Task List",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Checklist of items with completion states for to-do lists and multi-step progress" />
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
		<P>A task list displays a checklist of items with completion states. Use for to-do lists, onboarding checklists, or multi-step progress indicators.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="task-list" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Use <Code>&lt;input type="checkbox"&gt;</Code> for each task state, wrapped in a label for click-to-toggle support.</Li>
			<Li>A "check all" / "expand all" control needs three states: checked, unchecked, and mixed (indeterminate). HTML checkboxes support the <Code>indeterminate</Code> property via JavaScript.</Li>
			<Li>Use <Code>&lt;fieldset&gt;</Code> and <Code>&lt;legend&gt;</Code> if the task list represents a group of related controls.</Li>
			<Li>When a task is removed from the list, move focus to the next logical item — never let focus drop to <Code>&lt;body&gt;</Code>.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2024/03/check-all-expand-all-controls.html">Check-All / Expand-All Controls</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2017/05/under-engineered-custom-radio-buttons-and-checkboxen.html">Under-Engineered Custom Radio Buttons and Checkboxen</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/form/input-checkbox">Checkboxes</A> — for the underlying control pattern</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>tasks</P>
	</Section>
</LayoutTableOfContents>
