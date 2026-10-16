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
import Variable from "#components/Variable.svelte";

const page = {
	group: "Form",
	title: "Address input",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Address fields capture physical address information, grouped inside a fieldset with a legend." />
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
		<P>Address fields capture physical address information. Group address fields inside a <Code>&lt;fieldset&gt;</Code> with a <Code>&lt;legend&gt;</Code> to provide context for the related fields.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="form-input-address" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Use <Code>&lt;fieldset&gt;</Code> and <Code>&lt;legend&gt;</Code> to group address fields. The legend text should describe the address purpose (e.g. "Shipping address").</Li>
			<Li>Use appropriate <Code>autocomplete</Code> values for each field (<Code>street-address</Code>, <Code>address-line1</Code>, <Code>address-line2</Code>, <Code>address-level2</Code> for city, <Code>address-level1</Code> for state/province, <Code>postal-code</Code>, <Code>country</Code>).</Li>
			<Li>Each field must have its own explicit <Code>&lt;label for="id"&gt;</Code> association.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2022/07/use-legend-and-fieldset.html">Use Legend and Fieldset</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2020/01/my-priority-of-methods-for-labeling-a-control.html">My Priority of Methods for Labeling a Control</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/form/input-text">Text input</A> — for individual fields</Li>
			<Li><A href="/text/address">Address</A> — for displaying contact information</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for input</P>
	</Section>
</LayoutTableOfContents>
