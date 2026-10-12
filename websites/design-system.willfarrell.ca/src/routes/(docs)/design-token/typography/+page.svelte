<script>
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import H3 from "@willfarrell-ds/svelte/components/Heading3.svelte";
import H4 from "@willfarrell-ds/svelte/components/Heading4.svelte";
import H5 from "@willfarrell-ds/svelte/components/Heading5.svelte";
import H6 from "@willfarrell-ds/svelte/components/Heading6.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import Image from "@willfarrell-ds/svelte/components/Image.svelte";
import InputText from "@willfarrell-ds/svelte/components/InputText.svelte";
import LayoutTableOfContents from "@willfarrell-ds/svelte/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@willfarrell-ds/svelte/components/NavScrollspy.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Abbr from "@willfarrell-ds/svelte/elements/abbr.svelte";
import Address from "@willfarrell-ds/svelte/elements/address.svelte";
import B from "@willfarrell-ds/svelte/elements/b.svelte";
import Blockquote from "@willfarrell-ds/svelte/elements/blockquote.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Cite from "@willfarrell-ds/svelte/elements/cite.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Del from "@willfarrell-ds/svelte/elements/del.svelte";
import Details from "@willfarrell-ds/svelte/elements/details.svelte";
import Em from "@willfarrell-ds/svelte/elements/em.svelte";
import Footer from "@willfarrell-ds/svelte/elements/footer.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import Hgroup from "@willfarrell-ds/svelte/elements/hgroup.svelte";
import I from "@willfarrell-ds/svelte/elements/i.svelte";
import Img from "@willfarrell-ds/svelte/elements/img.svelte";
import Ins from "@willfarrell-ds/svelte/elements/ins.svelte";
import Kbd from "@willfarrell-ds/svelte/elements/kbd.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Mark from "@willfarrell-ds/svelte/elements/mark.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import S from "@willfarrell-ds/svelte/elements/s.svelte";
import Section from "@willfarrell-ds/svelte/elements/section.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Strong from "@willfarrell-ds/svelte/elements/strong.svelte";
import Sub from "@willfarrell-ds/svelte/elements/sub.svelte";
import Summary from "@willfarrell-ds/svelte/elements/summary.svelte";
import Sup from "@willfarrell-ds/svelte/elements/sup.svelte";
import U from "@willfarrell-ds/svelte/elements/u.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import Var from "@willfarrell-ds/svelte/elements/var.svelte";
import Snippet from "#components/Snippet.svelte";
import Variable from "#components/Variable.svelte";

// const fontSize = 16; // px
// const fontScale = 0.5; // vw
// const deviceSizes = [360, 480, 768, 1024, 1280, 1920]; // px
// const baseScale = 1;
// const headerScales = [2, 1.75, 1.5, 1.25, 1.125, 1];
// const smallScale = 0.8;

// const calcHeight = (elemScale, deviceSize) => {
// 	return (elemScale * fontSize + (fontScale / 100) * deviceSize).toFixed(2);
// };

//	const max = (
// 	headerScales[1] * fontSize +
// 	(fontScale / 100) * deviceSizes[deviceSizes.length - 1]
// ).toFixed(2);
//	const min = (headerScales[0] * fontSize + (fontScale / 100) * deviceSizes[0]).toFixed(2);
//console.log(max / min);

const page = {
	group: "Design tokens",
	title: "Font family",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Font family, size, weight, and line-height configuration for the design system" />
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
					<Li><A href="#font-family">Font family</A></Li>
					<Li><A href="#font-size">Font size</A></Li>
		<Li><A href="#example">Font weight</A></Li>
					<Li><A href="#example">Line height</A></Li>
					<Li><A href="#example">Letter spacing</A></Li>
					<Li><A href="#example">Example</A></Li>
					<Li><A href="#references">References</A></Li>
					<Li><A href="#variables">Variables</A></Li>
				</Ol>
		{/snippet}

		</NavScrollspy>
	{/snippet}
	<Section>
		<P></P>
	</Section>
	<Section>
		<H2 id="font-family">Font family</H2>
		<P
			>Defaults to `system-ui, sans-serif`. Can be overridden with <A
				href="https://modernfontstacks.com">modern font stacks</A
			> or any other web font like <A href="https://brailleinstitute.org/freefont"
				>Atkinson Hyperlegible</A
			>. If using a web font, watch <A href="https://www.youtube.com/watch?v=P4378iO4oBI"
				>Font Performance Strategies | Mandy Michael | performance.now() 2024
			</A> to be sure you're implementing in a performant way.</P
		>
	</Section>
	<Section>
		<H2 id="font-size">Font size</H2>
		<P
			>Set to the users preference or 18px, whichever is larger. 18px is chosen because of the
			increased thickness leading to improved contrast (WCAG ???). All headers use % of user setting,
			while ensuring a 2.5 ratio between the largest and smallest font sizes for readability.</P
		>

		<P
			>https://adrianroselli.com/2024/03/the-ultimate-ideal-bestest-base-font-size-that-everyone-is-keeping-a-secret-especially-chet.html</P
		>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="heading-group" />
		<Snippet example="headings" />
		<Snippet example="paragraphs" />
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2024/03/the-ultimate-ideal-bestest-base-font-size-that-everyone-is-keeping-a-secret-especially-chet.html">The Ultimate Ideal Bestest Base Font Size That Everyone Is Keeping a Secret, Especially Chet</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2019/12/responsive-type-and-zoom.html">Responsive Type and Zoom</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2024/08/under-engineered-dependency-free-skip-to-content-link.html">Under-Engineered Dependency-Free Skip to Content Link</A> — Adrian Roselli</Li>
			<Li><A href="https://modernfontstacks.com">Modern Font Stacks</A></Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
	</Section>
</LayoutTableOfContents>
