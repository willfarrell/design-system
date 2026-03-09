<script>
import Snippet from "@components/Snippet.svelte";
import Variable from "@components/Variable.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import Fieldset from "@design-system/components/Fieldset.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import H4 from "@design-system/components/Heading4.svelte";
import H5 from "@design-system/components/Heading5.svelte";
import H6 from "@design-system/components/Heading6.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import InputRadio from "@design-system/components/InputRadio.svelte";
import InputText from "@design-system/components/InputText.svelte";
import LayoutCenter from "@design-system/components/LayoutCenter.svelte";
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

const page = {
	// group: 'Design system',
	title: "Editor",
	update: "2025-05-01",
};
</script>

<svelte:head>
	<title>Editor | Design System</title>
	<meta name="description" content="Customize design system CSS custom properties" />
</svelte:head>

<LayoutCenter>
	<Hgroup>
		<H1>{page.title}</H1>
		<HSub><Small>Published on <DataTime datetime={page.update} /></Small></HSub>
	</Hgroup>
	<Section>
		<H2 id="variables">Variables</H2>
		<Form method="GET">
			<Fieldset label="Body">
				<InputText id="--font-family" name="--font-family" label="Font family" size="35" />
				<InputText id="--font-size" name="--font-size" label="Font size" size="5" />
				<InputText id="--font-weight" name="--font-weight" label="Font weight" size="5" />
				<InputText id="--line-height" name="--line-height" label="Line height" size="5" />
				<InputText id="--letter-spacing" name="--letter-spacing" label="Letter spacing" size="5" />
				<InputText id="--color" name="--color" label="Text color" size="35" />
				<InputText
					id="--background-color"
					name="--background-color"
					label="Background color"
					size="35"
				/>
			</Fieldset>
			<Fieldset label="Headings">
				<InputText
					id="--heading_font-family"
					name="--heading_font-family"
					label="Font family"
					size="35"
				/>
				<Fieldset
					id="--heading_font-scale"
					name="--heading_font-scale"
					label="Font scale"
					value="1.200"
				>
					<InputRadio label="1.067 – Minor Second" value="1.067" />
					<InputRadio label="1.125 – Major Second" value="1.125" />
					<InputRadio label="1.200 – Minor Third" value="1.200" />
					<InputRadio label="1.250 – Major Third" value="1.250" />
					<InputRadio label="1.333 – Perfect Fourth" value="1.333" />
					<InputRadio label="1.414 – Augmented Fourth" value="1.414" />
					<InputRadio label="1.500 – Perfect Fifth" value="1.500" />
					<InputRadio label="1.618 – Golden Ratio" value="1.618" />
				</Fieldset>
				<InputText
					id="--heading_font-weight"
					name="--heading-font-weight"
					label="Font weight"
					size="5"
				/>
				<InputText
					id="--heading_line-height"
					name="--heading_line-height"
					label="Line height"
					size="5"
				/>
				<InputText
					id="--heading_letter-spacing"
					name="--heading_letter-spacing"
					label="Letter spacing"
					size="5"
				/>
				<InputText id="--heading_color" name="--heading_color" label="Text color" size="35" />
			</Fieldset>
			<InputText id="--border_width" name="--border_width" label="Border width" size="10" />
			<InputText id="--border_radius" name="--border_radius" label="Border radius" size="10" />
			<!-- <InputText id="--gap" name="--gap" label="Gap" size="10" />
			<InputText id="--padding-fixed" name="--padding-fixed" label="Padding (fixed)" size="10" /> -->
			<Button type="submit">Save</Button>
		</Form>
		<!-- <Codeblock language="css" code={html} /> -->
	</Section>
</LayoutCenter>
