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
import Table from "@design-system/elements/table.svelte";
import Tbody from "@design-system/elements/tbody.svelte";
import Td from "@design-system/elements/td.svelte";
import Th from "@design-system/elements/th.svelte";
import Thead from "@design-system/elements/thead.svelte";
import Tr from "@design-system/elements/tr.svelte";
import U from "@design-system/elements/u.svelte";
import Ul from "@design-system/elements/ul.svelte";
import Var from "@design-system/elements/var.svelte";

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
	group: "Design tokens",
	title: "Font size",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="Responsive typography scale with fluid sizing based on user preference and viewport width" />
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
					<Li><A href="#example">Example</A></Li>
					<Li><A href="#references">References</A></Li>
					<Li><A href="#variables">Variables</A></Li>
				</Ol>
		{/snippet}

		</NavScrollspy>
	{/snippet}
	<Section>
		<P
			>Set to the users preference or 18px, whichever is larger. 18px is chosen because of the
			increased thickness leading to improved contrast (WCAG ???). All headers use % of user setting,
			while ensuring a 2.5 ratio between the largest and smallest font sizes for readability.</P
		>
		<H2>Fluid Font size</H2>
		<P>Optional: Can be applied using &lt;body class="fluid"&gt;.</P>
		<Table>
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
			>font-size -
			https://adrianroselli.com/2024/03/the-ultimate-ideal-bestest-base-font-size-that-everyone-is-keeping-a-secret-especially-chet.html
			max width - https://meyerweb.com/eric/thoughts/2018/06/28/what-is-the-css-ch-unit/</P
		>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="headings" />
		<Snippet example="paragraphs" />
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://adrianroselli.com/2024/03/the-ultimate-ideal-bestest-base-font-size-that-everyone-is-keeping-a-secret-especially-chet.html">The Ultimate Ideal Bestest Base Font Size That Everyone Is Keeping a Secret, Especially Chet</A> — Adrian Roselli</Li>
			<Li><A href="https://adrianroselli.com/2019/12/responsive-type-and-zoom.html">Responsive Type and Zoom</A> — Adrian Roselli</Li>
			<Li><A href="https://meyerweb.com/eric/thoughts/2018/06/28/what-is-the-css-ch-unit/">What Is the CSS ch Unit?</A> — Eric Meyer</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Form method="GET">
			<InputText id="--font-size" name="--font-size" label="Font size" size="5" />
			<Button type="submit">Save</Button>
		</Form>
	</Section>
</LayoutTableOfContents>
