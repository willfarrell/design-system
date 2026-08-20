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
	title: "Organization input",
	update: "2026-07-20",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="The organization input captures a company or organization name with autocomplete support for the address autofill group." />
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
		<P>The organization input captures a company or organization name. Set <Code>autocomplete</Code> to <Code>organization</Code> to enable browser autofill.</P>
		<P>Use it in B2B forms, and alongside address fields in billing and shipping forms where <Code>organization</Code> is part of the address autofill group. Keep the field optional unless a company name is genuinely required.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="form-input-organization" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Use explicit <Code>&lt;label for="id"&gt;</Code> association with clear label text.</Li>
			<Li>Use <Code>autocomplete="organization"</Code> so browsers can autofill the company name, often as part of the address autofill group.</Li>
			<Li>Do not require the field unless the form genuinely needs a company name — many people are not completing it on behalf of an organization.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete">The HTML autocomplete attribute</A> — MDN</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/form/input-text">Text input</A> — for general text</Li>
			<Li><A href="/form/input-address">Address</A> — organization is part of the address autofill group</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for input</P>
	</Section>
</LayoutTableOfContents>
