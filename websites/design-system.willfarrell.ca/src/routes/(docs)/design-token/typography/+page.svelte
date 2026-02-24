<script>
import Snippet from "@components/Snippet.svelte";
import Variable from "@components/Variable.svelte";
import DataTime from "@design-system/svelte/DataTime.svelte";
import A from "@design-system/svelte/element/a.svelte";
import Abbr from "@design-system/svelte/element/abbr.svelte";
import Address from "@design-system/svelte/element/address.svelte";
import B from "@design-system/svelte/element/b.svelte";
import Blockquote from "@design-system/svelte/element/blockquote.svelte";
import Button from "@design-system/svelte/element/button.svelte";
import Cite from "@design-system/svelte/element/cite.svelte";
import Code from "@design-system/svelte/element/code.svelte";
import Del from "@design-system/svelte/element/del.svelte";
import Details from "@design-system/svelte/element/details.svelte";
import Em from "@design-system/svelte/element/em.svelte";
import Footer from "@design-system/svelte/element/footer.svelte";
import Form from "@design-system/svelte/element/form.svelte";
import Header from "@design-system/svelte/element/header.svelte";
import Hgroup from "@design-system/svelte/element/hgroup.svelte";
import I from "@design-system/svelte/element/i.svelte";
import Img from "@design-system/svelte/element/img.svelte";
import Ins from "@design-system/svelte/element/ins.svelte";
import Kbd from "@design-system/svelte/element/kbd.svelte";
import Li from "@design-system/svelte/element/li.svelte";
import Mark from "@design-system/svelte/element/mark.svelte";
import Ol from "@design-system/svelte/element/ol.svelte";
import P from "@design-system/svelte/element/p.svelte";
import S from "@design-system/svelte/element/s.svelte";
import Section from "@design-system/svelte/element/section.svelte";
import Small from "@design-system/svelte/element/small.svelte";
import Strong from "@design-system/svelte/element/strong.svelte";
import Sub from "@design-system/svelte/element/sub.svelte";
import Summary from "@design-system/svelte/element/summary.svelte";
import Sup from "@design-system/svelte/element/sup.svelte";
import U from "@design-system/svelte/element/u.svelte";
import Ul from "@design-system/svelte/element/ul.svelte";
import Var from "@design-system/svelte/element/var.svelte";
import H1 from "@design-system/svelte/Heading1.svelte";
import H2 from "@design-system/svelte/Heading2.svelte";
import H3 from "@design-system/svelte/Heading3.svelte";
import H4 from "@design-system/svelte/Heading4.svelte";
import H5 from "@design-system/svelte/Heading5.svelte";
import H6 from "@design-system/svelte/Heading6.svelte";
import HSub from "@design-system/svelte/HeadingSub.svelte";
import Image from "@design-system/svelte/Image.svelte";
import InputText from "@design-system/svelte/InputText.svelte";
import LayoutTableOfContents from "@design-system/svelte/LayoutTableOfContents.svelte";
import NavScrollspy from "@design-system/svelte/NavScrollspy.svelte";

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
			<Section>
				<Header><H2>On this page</H2></Header>
				<Ol>
					<Li><A href="#font-family">Font family</A></Li>
					<Li><A href="#font-size">Font size</A></Li>
					<Li><A href="#font-scale">Font scale</A></Li>
					<Li><A href="#example">Font weight</A></Li>
					<Li><A href="#example">Line height</A></Li>
					<Li><A href="#example">Letter spacing</A></Li>
					<Li><A href="#example">Example</A></Li>
					<Li><A href="#variables">Variables</A></Li>
				</Ol>
			</Section>
		</NavScrollspy>
	{/snippet}
	<Section>
		<P></P>
	</Section>
	<Section>
		<H2 id="font-family">Font family</H2>
		<P
			>Defaults to `system-ui, sans-serif`. Can be overriden with <A
				href="https://modernfontstacks.com">modern font stacks</A
			> or any other web font like <A href="https://brailleinstitute.org/freefont"
				>Atkinson Hyperlegible</A
			>. If using a web font, watch <A href="https://www.youtube.com/watch?v=P4378iO4oBI"
				>Font Performance Strategies | Mandy Michael | performance.now() 2024
			</A> to be sure you're impementing in a performant way.</P
		>
	</Section>
	<Section>
		<H2 id="font-size">Font size</H2>
		<P
			>Set to the users preference or 18px, whichever is larger. 18px is choosen because of the
			increased thickness leading to improved contast (WCAG ???). All headers use % of user setting,
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
		<H2 id="variables">Variables</H2>
	</Section>
</LayoutTableOfContents>
