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
	group: "Form",
	title: "Checkbox input",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Checkboxes allow users to select one or more options from a list, or toggle a single option on/off." />
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
		<P>Checkboxes allow users to select one or more options from a list, or toggle a single option on/off. Group related checkboxes inside a <Code>&lt;fieldset&gt;</Code> with a <Code>&lt;legend&gt;</Code>.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="form-input-checkbox" />
		<P>Related options can be organized into groups using nested <Code>&lt;fieldset&gt;</Code> elements that share the same <Code>name</Code>.</P>
		<Snippet example="form-input-checkbox-group" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Use <Code>&lt;fieldset&gt;</Code> and <Code>&lt;legend&gt;</Code> to group related checkboxes. The legend provides context announced by screen readers before each option.</Li>
			<Li>Visually hide checkbox inputs using clip/position methods — never <Code>display: none</Code>. Use <Code>::before</Code>/<Code>::after</Code> pseudo-elements for custom indicators.</Li>
			<Li>Support Windows High Contrast Mode, dark mode, <Code>prefers-reduced-motion</Code>, RTL, and print.</Li>
			<Li>Consider <Code>accent-color</Code> for simple brand customization of native checkboxes.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2017/05/under-engineered-custom-radio-buttons-and-checkboxen.html">Under-Engineered Custom Radio Buttons and Checkboxen</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2022/07/use-legend-and-fieldset.html">Use Legend and Fieldset</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/form/input-radio">Radio buttons</A> — for single-selection from a group</Li>
			<Li><A href="/form/input-select">Select</A> — for dropdown selection</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for input</P>
	</Section>
</LayoutTableOfContents>
