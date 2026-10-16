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
import Img from "@willfarrell-ds/svelte/elements/img.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Section from "@willfarrell-ds/svelte/elements/section.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Sup from "@willfarrell-ds/svelte/elements/sup.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import Snippet from "#components/Snippet.svelte";

const page = {
	group: "Component",
	title: "Image",
	update: "2026-10-13",
};

const brokenCode = `<Img src="/img/missing.jpg" alt="A red fox curled up asleep in fresh snow" />`;
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Native image with styled alt text when the image fails to load" />
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
					<Li><A href="#broken">Broken image</A></Li>
					<Li><A href="#placeholder">Placeholder</A></Li>
					<Li><A href="#accessibility">Accessibility</A></Li>
					<Li><A href="#references">References</A></Li>
					<Li><A href="#variables">Variables</A></Li>
				</Ol>
			{/snippet}
		</NavScrollspy>
	{/snippet}
	<Section>
		<H2 id="description">Description</H2>
		<P>The <Code>img</Code> element from <Code>@willfarrell-ds/svelte/elements/</Code> renders a native <Code>&lt;img&gt;</Code> that loads lazily and decodes off the main thread. It never grows wider than its container.</P>
	</Section>
	<Section>
		<H2 id="broken">Broken image</H2>
		<P>When an image fails to load, the browser shows its <Code>alt</Code> text in its place. The design system sets that text in italics with balanced line breaks, so it reads as a description and not as page copy. A loaded image looks the same as before.</P>
		<Img src="/img/missing.jpg" alt="A red fox curled up asleep in fresh snow" />
		<Codeblock language="html" code={brokenCode} />
	</Section>
	<Section>
		<H2 id="placeholder">Placeholder</H2>
		<P>Pass <Code>lqip</Code> to <Code>Image</Code> to paint a blurred colour preview behind the image while it loads. The value is one integer, which CSS decodes into a base colour and a 3×2 grid of lighter and darker patches. The loaded image covers it. No JavaScript runs.</P>
		<P>The prop renders as a <Code>data-lqip</Code> attribute, which CSS reads with <Code>attr()</Code>, so it works under a CSP that blocks inline styles. Browsers without typed <Code>attr()</Code> show no placeholder.</P>
		<P>The integer is a 20-bit value minus 2<Sup>19</Sup>. Bits 18–8 hold six 2-bit cell lightness values, bits 7–6 the base lightness, bits 5–3 the oklab <Code>a</Code> and bits 2–0 the oklab <Code>b</Code>.</P>
		<Snippet example="image-lqip" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Every image needs an <Code>alt</Code>. Describe what the image shows, or use <Code>alt=""</Code> when it is decorative (WCAG 1.1.1)</Li>
			<Li>The alt text keeps the inherited text colour, so it has the same contrast as body text in light, dark and forced colours modes</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://leanrada.com/notes/css-only-lqip/">Minimal CSS-only blurry image placeholders</A> — Lean Rada</Li>
			<Li><A href="https://piccalil.li/blog/you-can-style-alt-text-like-any-other-text/">You can style alt text like any other text</A> — Piccalilli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Ul>
			<Li><Code>--lqip</Code> — the encoded placeholder integer, read from <Code>data-lqip</Code></Li>
		</Ul>
	</Section>
</LayoutTableOfContents>
