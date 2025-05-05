<script>
	import LayoutTableOfContents from '@design-system/svelte/LayoutTableOfContents.svelte';

	import Section from '@design-system/svelte/element/section.svelte';
	import Hgroup from '@design-system/svelte/element/hgroup.svelte';
	import H1 from '@design-system/svelte/Heading1.svelte';
	import HSub from '@design-system/svelte/HeadingSub.svelte';
	import NavScrollspy from '@design-system/svelte/NavScrollspy.svelte';
	import Header from '@design-system/svelte/element/header.svelte';
	import H2 from '@design-system/svelte/Heading2.svelte';
	import H3 from '@design-system/svelte/Heading3.svelte';
	import H4 from '@design-system/svelte/Heading4.svelte';
	import H5 from '@design-system/svelte/Heading5.svelte';
	import H6 from '@design-system/svelte/Heading6.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Abbr from '@design-system/svelte/element/abbr.svelte';
	import Address from '@design-system/svelte/element/address.svelte';
	import B from '@design-system/svelte/element/b.svelte';
	import Strong from '@design-system/svelte/element/strong.svelte';
	import Em from '@design-system/svelte/element/em.svelte';
	import I from '@design-system/svelte/element/i.svelte';
	import Del from '@design-system/svelte/element/del.svelte';
	import Ins from '@design-system/svelte/element/ins.svelte';
	import Code from '@design-system/svelte/element/code.svelte';
	import Kbd from '@design-system/svelte/element/kbd.svelte';
	import Mark from '@design-system/svelte/element/mark.svelte';
	import S from '@design-system/svelte/element/s.svelte';
	import Small from '@design-system/svelte/element/small.svelte';
	import Sub from '@design-system/svelte/element/sub.svelte';
	import Sup from '@design-system/svelte/element/sup.svelte';
	import U from '@design-system/svelte/element/u.svelte';
	import Var from '@design-system/svelte/element/var.svelte';
	import Ul from '@design-system/svelte/element/ul.svelte';
	import Ol from '@design-system/svelte/element/ol.svelte';
	import Li from '@design-system/svelte/element/li.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
	import Img from '@design-system/svelte/element/img.svelte';
	import Details from '@design-system/svelte/element/details.svelte';
	import Summary from '@design-system/svelte/element/summary.svelte';
	import Blockquote from '@design-system/svelte/element/blockquote.svelte';
	import Footer from '@design-system/svelte/element/footer.svelte';
	import Cite from '@design-system/svelte/element/cite.svelte';
	import Form from '@design-system/svelte/element/form.svelte';

	import Image from '@design-system/svelte/Image.svelte';
	import InputText from '@design-system/svelte/InputText.svelte';
	import Time from '@design-system/svelte/Time.svelte';

	import Snippet from '@components/Snippet.svelte';
	import Variable from '@components/Variable.svelte';

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
		group: 'Design tokens',
		title: 'Font family',
		update: '2025-05-01'
	};
</script>

<LayoutTableOfContents>
	{#snippet hgroup()}
		<Hgroup>
			<HSub>{page.group}</HSub>
			<H1>{page.title}</H1>
			<HSub><Small>Published on <Time datetime={page.update} /></Small></HSub>
		</Hgroup>
	{/snippet}
	{#snippet scrollspy()}
		<NavScrollspy>
			<Section>
				<Header><H2>On this page</H2></Header>
				<Ul>
					<Li><A href="#example">Example</A></Li>
					<Li><A href="#variables">Variables</A></Li>
				</Ul>
			</Section>
		</NavScrollspy>
	{/snippet}
	<Section>
		<P
			>Defaults to `system-ui, sans-serif`. Can be overriden with https://modernfontstacks.com/ Pros
			- faster load times - prevent CLS from font loading - allow OS override to people with visual
			disabilities Atkinson Hyperlegible - https://brailleinstitute.org/freefont</P
		>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="paragraph" />
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Form method="GET">
			<InputText id="--font-family" name="--font-family" label="Font family" size="35" />
			<Button type="submit">Save</Button>
		</Form>
	</Section>
</LayoutTableOfContents>
