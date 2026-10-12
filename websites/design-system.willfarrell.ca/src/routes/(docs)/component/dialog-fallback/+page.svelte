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
	group: "Component",
	title: "Dialog (JS fallback)",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="JavaScript-based modal dialog fallback using custom elements with inert attribute for browsers without command/commandfor support" />
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
		<P>A JavaScript-based fallback for the dialog component, using custom elements (<Code>is="ds-button-dialog"</Code> and <Code>is="ds-dialog"</Code>) with the <Code>inert</Code> attribute. Use this approach for browsers that do not yet support <Code>command</Code>/<Code>commandfor</Code>. Prefer the <A href="/component/dialog">command-based dialog</A> when possible.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="dialog-fallback" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Use native <Code>&lt;dialog&gt;</Code> with <Code>showModal()</Code>. It provides built-in focus trapping and the <Code>inert</Code> attribute for background content.</Li>
			<Li>The trigger button should use <Code>aria-haspopup="dialog"</Code> and <Code>aria-expanded</Code> to communicate state.</Li>
			<Li>Focus placement on open depends on dialog type: short messages focus the close button, longer content focuses the dialog or heading, action-required dialogs focus the least destructive option, and brief forms focus the first input.</Li>
			<Li>Always return focus to the triggering element when the dialog closes.</Li>
			<Li>Use <Code>aria-labelledby</Code> pointing to the dialog heading for the accessible name.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html">Dialog Focus in Screen Readers</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2025/06/where-to-put-focus-when-opening-a-modal-dialog.html">Where to Put Focus When Opening a Modal Dialog</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2023/05/brief-note-on-popovers-with-dialogs.html">Brief Note on Popovers with Dialogs</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/component/dialog">Dialog</A> — command-based (preferred)</Li>
			<Li><A href="/component/popover">Popover</A> — for non-modal overlays</Li>
			<Li><A href="/text/details">Disclosure</A> — for inline show/hide</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>none for dialog</P>
	</Section>
</LayoutTableOfContents>
