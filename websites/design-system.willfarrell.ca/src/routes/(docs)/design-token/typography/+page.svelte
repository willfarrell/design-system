<script>
import Snippet from "@components/Snippet.svelte";
import Variable from "@components/Variable.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import H4 from "@design-system/components/Heading4.svelte";
import H5 from "@design-system/components/Heading5.svelte";
import H6 from "@design-system/components/Heading6.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import Image from "@design-system/components/Image.svelte";
import InputText from "@design-system/components/InputText.svelte";
import LayoutTableOfContents from "@design-system/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@design-system/components/NavScrollspy.svelte";
import A from "@design-system/elements/a.svelte";
import Abbr from "@design-system/elements/abbr.svelte";
import Address from "@design-system/elements/address.svelte";
import B from "@design-system/elements/b.svelte";
import Blockquote from "@design-system/elements/blockquote.svelte";
import Button from "@design-system/elements/button.svelte";
import Cite from "@design-system/elements/cite.svelte";
import Code from "@design-system/elements/code.svelte";
import Del from "@design-system/elements/del.svelte";
import Details from "@design-system/elements/details.svelte";
import Em from "@design-system/elements/em.svelte";
import Footer from "@design-system/elements/footer.svelte";
import Form from "@design-system/elements/form.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import I from "@design-system/elements/i.svelte";
import Img from "@design-system/elements/img.svelte";
import Ins from "@design-system/elements/ins.svelte";
import Kbd from "@design-system/elements/kbd.svelte";
import Li from "@design-system/elements/li.svelte";
import Mark from "@design-system/elements/mark.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";
import S from "@design-system/elements/s.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Strong from "@design-system/elements/strong.svelte";
import Sub from "@design-system/elements/sub.svelte";
import Summary from "@design-system/elements/summary.svelte";
import Sup from "@design-system/elements/sup.svelte";
import U from "@design-system/elements/u.svelte";
import Ul from "@design-system/elements/ul.svelte";
import Var from "@design-system/elements/var.svelte";

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
