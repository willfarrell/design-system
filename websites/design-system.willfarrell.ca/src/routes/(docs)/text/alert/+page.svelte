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
	title: "Alert",
	update: "2026-01-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Alerts communicate urgent or important messages to the user, announced immediately by screen readers via live regions." />
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
		<P>Alerts communicate urgent or important messages to the user. They are announced immediately by screen readers via live regions.</P>
		<P>Use alerts for time-sensitive or critical information. For non-urgent contextual information, use a callout instead.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="alert" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Use <Code>role="alert"</Code> for assertive announcements that interrupt the current screen reader output.</Li>
			<Li>Use <Code>role="status"</Code> (or <Code>aria-live="polite"</Code>) for non-urgent status updates that wait for a pause in speech.</Li>
			<Li>The <Code>role="alert"</Code> rarely produces the expected "alert" prefix announcement across screen readers — test with multiple assistive technologies.</Li>
			<Li>Live region elements must exist in the DOM before content is injected for announcements to fire.</Li>
			<Li>Prefer <Code>aria-live="polite"</Code> as the default. Reserve <Code>assertive</Code> for critical, time-sensitive information.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2026/01/live-region-support.html">Live Region Support</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/callout">Callout</A> — for non-urgent contextual information</Li>
			<Li><A href="/form/errors">Form errors</A> — for field-level error announcements</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for alert</P>
	</Section>
</LayoutTableOfContents>
