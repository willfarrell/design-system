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
	import Table from '@design-system/svelte/element/table.svelte';
	import Thead from '@design-system/svelte/element/thead.svelte';
	import Tbody from '@design-system/svelte/element/tbody.svelte';
	import Tr from '@design-system/svelte/element/tr.svelte';
	import Th from '@design-system/svelte/element/th.svelte';
	import Td from '@design-system/svelte/element/td.svelte';
	import Form from '@design-system/svelte/element/form.svelte';

	import Image from '@design-system/svelte/Image.svelte';
	import InputText from '@design-system/svelte/InputText.svelte';
	import Time from '@design-system/svelte/Time.svelte';

	import Snippet from '@components/Snippet.svelte';
	import Variable from '@components/Variable.svelte';

	const fontSize = 16; // px
	const fontScale = 0.5; // vw
	const deviceSizes = [360, 480, 768, 1024, 1280, 1920]; // px
	const baseScale = 1;
	const headerScales = [2, 1.75, 1.5, 1.25, 1.125, 1.0625];
	const smallScale = 0.8;

	const calcHeight = (elemScale, deviceSize) => {
		return (elemScale * fontSize + (fontScale / 100) * deviceSize).toFixed(2);
	};
	const page = {
		group: 'Design tokens',
		title: 'Font size',
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
			>Set to the users preference or 18px, whichever is larger. 18px is choosen because of the
			increased thickness leading to improved contast (WCAG ???). All headers use % of user setting,
			while ensuring a 2.5 ratio between the largest and smallest font sizes for readability.</P
		>
		<H2>Fluid Font size</H2>
		<P>Optional: Can be applied using &lt;body class="fluid"&gt;.</P>
		<Table class="stripe">
			<Thead>
				<Tr>
					<Th scope="col">Device width</Th>
					{#each deviceSizes as size}
						<Th scope="col">{size}px</Th>
					{/each}
				</Tr>
			</Thead>
			<Tbody>
				<Tr>
					<Th scope="row">Base</Th>
					{#each deviceSizes as deviceSize}
						<Td
							><Abbr title="{baseScale}rem + {fontScale}vw"
								>{calcHeight(baseScale, deviceSize)}px</Abbr
							>
						</Td>
					{/each}
				</Tr>
				{#each headerScales as headerScale, idx}
					<Tr>
						<Th scope="row">&lt;h{idx + 1}&gt;</Th>
						{#each deviceSizes as deviceSize}
							<Td
								><Abbr title="{headerScale}rem + {fontScale}vw"
									>{calcHeight(headerScale, deviceSize)}px</Abbr
								></Td
							>
						{/each}
					</Tr>
				{/each}

				<Tr>
					<Th scope="row">&lt;small&gt;</Th>
					{#each deviceSizes as deviceSize}
						<Td
							><Abbr title="{smallScale}rem + {fontScale}vw"
								>{calcHeight(smallScale, deviceSize)}px</Abbr
							></Td
						>
					{/each}
				</Tr>
				<Tr>
					<Th scope="row">&lt;h1&gt;/&lt;small&gt;</Th>
					{#each deviceSizes as deviceSize}
						<Td
							>x<Abbr
								title="({headerScales[0]}rem + {fontScale}vw) / ({smallScale}rem + {fontScale}vw)"
								>{(
									calcHeight(headerScales[0], deviceSize) / calcHeight(smallScale, deviceSize)
								).toFixed(2)}</Abbr
							>
						</Td>
					{/each}
				</Tr>
			</Tbody>
		</Table>

		<P
			>https://adrianroselli.com/2024/03/the-ultimate-ideal-bestest-base-font-size-that-everyone-is-keeping-a-secret-especially-chet.html</P
		>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="paragraph" />
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Form method="GET">
			<InputText id="--font-size" name="--font-size" label="Font size" size="5" />
			<Button type="submit">Save</Button>
		</Form>
	</Section>
</LayoutTableOfContents>
