<script>
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import Fieldset from "@willfarrell-ds/svelte/components/Fieldset.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import H3 from "@willfarrell-ds/svelte/components/Heading3.svelte";
import H4 from "@willfarrell-ds/svelte/components/Heading4.svelte";
import H5 from "@willfarrell-ds/svelte/components/Heading5.svelte";
import H6 from "@willfarrell-ds/svelte/components/Heading6.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import InputRadio from "@willfarrell-ds/svelte/components/InputRadio.svelte";
import InputText from "@willfarrell-ds/svelte/components/InputText.svelte";
import LayoutCenter from "@willfarrell-ds/svelte/components/LayoutCenter.svelte";
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
