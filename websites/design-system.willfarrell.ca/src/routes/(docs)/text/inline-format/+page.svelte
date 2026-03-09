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
	title: "Inline formatted elements",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Inline formatting elements convey meaning through text-level semantics like mark, del, ins, and s for editorial changes." />
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
		<P>Inline formatting elements convey meaning through text-level semantics. Elements like <Code>&lt;mark&gt;</Code>, <Code>&lt;del&gt;</Code>, <Code>&lt;ins&gt;</Code>, and <Code>&lt;s&gt;</Code> communicate editorial changes and highlights.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="inline-format-elements" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Most screen readers do not announce <Code>&lt;mark&gt;</Code>, <Code>&lt;del&gt;</Code>, <Code>&lt;ins&gt;</Code>, or <Code>&lt;s&gt;</Code> by default. Use CSS-generated content with <Code>::before</Code>/<Code>::after</Code> pseudo-elements to provide screen reader announcements.</Li>
			<Li>Highlighted text (<Code>&lt;mark&gt;</Code>) needs 3:1 contrast for the highlight block and 4.5:1 for text within. Do not rely on color alone for distinction.</Li>
			<Li>Use visually-hidden <Code>::before</Code>/<Code>::after</Code> content (e.g. "[start deletion]"/"[end deletion]") to announce editorial marks to assistive technology.</Li>
			<Li>Support Windows High Contrast Mode with system color keywords.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2017/12/tweaking-text-level-styles.html">Tweaking Text Level Styles</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2024/05/a-brief-note-on-highlighted-text.html">A Brief Note on Highlighted Text</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/inline-style">Inline style elements</A> — for presentational inline elements</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for inline elements</P>
	</Section>
</LayoutTableOfContents>
