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
	group: "Form",
	title: "JavaScript enabled",
	update: "2026-10-10",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="A hidden input that the ds-input-javascript-enabled web component sets to true, telling the server the submission came from a browser running JavaScript." />
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
		<P>The JavaScript enabled input is a hidden field marked <Code>is="ds-input-javascript-enabled"</Code>. The server renders it with a false value; when the web component upgrades it sets the value to <Code>true</Code>.</P>
		<P>Use it when the server needs to know whether the progressive enhancements ran, for example to decide whether to trust a value another component filled in. Load the component with a <Code>&lt;link rel="modulepreload"&gt;</Code> for <Code>ds-input-javascript-enabled.js</Code>; the Svelte component does not add one.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="form-input-javascript-enabled" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The field is <Code>type="hidden"</Code>, so it is not announced and takes no focus.</Li>
			<Li>The form must still work when the value is false; never block a submission because JavaScript did not run.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#customized_built-in_elements">Customized built-in elements</A> — MDN</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/form/input-timezone">Timezone</A> — another hidden field filled on upgrade</Li>
			<Li><A href="/form/input-browser-up-to-date">Browser up to date</A> — a hidden field that reports an outdated browser</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Ul>
			<Li><Code>id</Code> — defaults to <Code>javascript-enabled</Code></Li>
			<Li><Code>name</Code> — defaults to the id</Li>
			<Li><Code>value</Code> — defaults to <Code>false</Code></Li>
		</Ul>
	</Section>
</LayoutTableOfContents>
