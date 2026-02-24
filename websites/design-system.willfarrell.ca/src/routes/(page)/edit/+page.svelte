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
import Fieldset from "@design-system/svelte/Fieldset.svelte";
import H1 from "@design-system/svelte/Heading1.svelte";
import H2 from "@design-system/svelte/Heading2.svelte";
import H3 from "@design-system/svelte/Heading3.svelte";
import H4 from "@design-system/svelte/Heading4.svelte";
import H5 from "@design-system/svelte/Heading5.svelte";
import H6 from "@design-system/svelte/Heading6.svelte";
import HSub from "@design-system/svelte/HeadingSub.svelte";
import InputRadio from "@design-system/svelte/InputRadio.svelte";
import InputText from "@design-system/svelte/InputText.svelte";
import LayoutCenter from "@design-system/svelte/LayoutCenter.svelte";
import NavScrollspy from "@design-system/svelte/NavScrollspy.svelte";

const page = {
	// group: 'Design system',
	title: "Editor",
	update: "2025-05-01",
};
</script>

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
