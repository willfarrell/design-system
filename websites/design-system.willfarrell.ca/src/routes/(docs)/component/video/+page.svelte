<script>
import Codeblock from "@willfarrell-ds/svelte/components/Codeblock.svelte";
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
	group: "Component",
	title: "Video",
	update: "2026-10-13",
};

const audioCode = `<Audio>
  <Source src="/audio/episode.opus" type="audio/ogg; codecs=opus" />
  <Source src="/audio/episode.m4a" type="audio/mp4" />
</Audio>`;
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Native video player with required captions, an optional caption and a transcript" />
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
					<Li><A href="#audio">Audio</A></Li>
					<Li><A href="#references">References</A></Li>
					<Li><A href="#related">Related</A></Li>
					<Li><A href="#variables">Variables</A></Li>
				</Ol>
		{/snippet}

		</NavScrollspy>
	{/snippet}
	<Section>
		<H2 id="description">Description</H2>
		<P>The Video component renders the browser's native <Code>&lt;video controls&gt;</Code> player. There is no custom JavaScript player, so play, pause, seek, volume, captions and fullscreen all work with the keyboard and assistive technology the browser already supports.</P>
		<P>Pass one <Code>src</Code> or a list of <Code>sources</Code> (each <Code>&#123; src, type &#125;</Code>), plus a <Code>tracks</Code> list. At least one track of kind <Code>captions</Code> or <Code>subtitles</Code> is required, and <Code>kind</Code> defaults to <Code>captions</Code>. Add a <Code>caption</Code> to wrap the video in a <Code>&lt;figure&gt;</Code>, and a <Code>transcript</Code> snippet to show the full text in a <Code>&lt;details&gt;</Code> disclosure.</P>
		<P>Video never autoplays. <Code>preload</Code> defaults to <Code>metadata</Code>, so only the duration and dimensions load until the user presses play. Set <Code>preload="none"</Code> for pages with many videos.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="video" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Captions are required: the component throws when no <Code>captions</Code> or <Code>subtitles</Code> track is given (WCAG 1.2.2, 1.2.4)</Li>
			<Li>The transcript in a native <Code>&lt;details&gt;</Code> gives a text alternative for all audio and visual content (WCAG 1.2.8)</Li>
			<Li>No autoplay, so audio never starts without a user action (WCAG 1.4.2) and nothing moves on load (WCAG 2.2.2)</Li>
			<Li>Native controls are keyboard operable and expose their names and states to screen readers</Li>
			<Li>Write your own captions. Don't rely on auto-generated captions or transcripts</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="audio">Audio</H2>
		<P>For audio-only content, use the <Code>audio</Code> and <Code>source</Code> elements from <Code>@willfarrell-ds/svelte/elements/</Code>. It also renders native controls with no autoplay and <Code>preload="none"</Code>. Put a transcript next to the player (WCAG 1.2.1).</P>
		<Codeblock language="html" code={audioCode} />
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://www.w3.org/WAI/media/av/">Making Audio and Video Media Accessible</A> — W3C WAI</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/text/details">Details</A>: the disclosure used for the transcript</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None</P>
	</Section>
</LayoutTableOfContents>
