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
	title: "Inline elements",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Inline style elements like strong, em, code, kbd, sub, sup, and abbr provide visual and semantic emphasis within text." />
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
		<P>Inline style elements like <Code>&lt;strong&gt;</Code>, <Code>&lt;em&gt;</Code>, <Code>&lt;code&gt;</Code>, <Code>&lt;kbd&gt;</Code>, <Code>&lt;sub&gt;</Code>, <Code>&lt;sup&gt;</Code>, <Code>&lt;abbr&gt;</Code>, and others provide visual and semantic emphasis within text.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="inline-style-elements" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li><Code>&lt;strong&gt;</Code> and <Code>&lt;em&gt;</Code> convey emphasis but most screen readers do not change pronunciation by default.</Li>
			<Li><Code>&lt;sub&gt;</Code> and <Code>&lt;sup&gt;</Code> announcements vary across screen readers. NVDA has a preference setting for announcements; VoiceOver offers Braille-only support; JAWS lacks support entirely.</Li>
			<Li>CSS <Code>vertical-align</Code> can break NVDA's sub/sup detection — use native elements rather than CSS positioning.</Li>
			<Li><Code>&lt;abbr&gt;</Code> with a <Code>title</Code> attribute provides the expanded form, but <Code>title</Code> is not reliably exposed across assistive technologies.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2022/09/brief-note-on-super-and-subscript-text.html">Brief Note on Super- and Subscript Text</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2017/12/tweaking-text-level-styles.html">Tweaking Text Level Styles</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/inline-format">Inline format elements</A> — for editorial marks (del, ins, mark)</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for inline elements</P>
	</Section>
</LayoutTableOfContents>
