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
	title: "Select input",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="The select input provides a native dropdown list for single selection. Use native select elements over custom implementations." />
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
		<P>The select input provides a dropdown list for single selection. Use native <Code>&lt;select&gt;</Code> elements — custom dropdown implementations interfere with mobile gesture controls and assistive technology.</P>
		<P>Do not use <Code>&lt;select multiple&gt;</Code> — use checkboxes instead for better usability.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="form-input-select" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Use native <Code>&lt;select&gt;</Code> with minimal CSS styling. Custom arrows via <Code>appearance: none</Code> + background SVG.</Li>
			<Li>Inherit typography: <Code>font: inherit; letter-spacing: inherit; word-spacing: inherit;</Code>.</Li>
			<Li>Use explicit <Code>&lt;label for="id"&gt;</Code> association.</Li>
			<Li>Mirror directional styles for RTL support.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2021/03/under-engineered-select-menus.html">Under-Engineered Select Menus</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2022/05/under-engineered-multi-selects.html">Under-Engineered Multi-Selects</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2020/01/my-priority-of-methods-for-labeling-a-control.html">My Priority of Methods for Labeling a Control</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/form/input-radio">Radio buttons</A> — for visible option selection</Li>
			<Li><A href="/form/input-checkbox">Checkboxes</A> — for multi-selection</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for input</P>
	</Section>
</LayoutTableOfContents>
