<script>
import ButtonSubmit from "@willfarrell-ds/svelte/components/ButtonSubmit.svelte";
import Fieldset from "@willfarrell-ds/svelte/components/Fieldset.svelte";
import FormErrors from "@willfarrell-ds/svelte/components/FormErrors.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import InputCheckbox from "@willfarrell-ds/svelte/components/InputCheckbox.svelte";
import InputSelect from "@willfarrell-ds/svelte/components/InputSelect.svelte";
import InputText from "@willfarrell-ds/svelte/components/InputText.svelte";
import InputTextarea from "@willfarrell-ds/svelte/components/InputTextarea.svelte";
import LayoutCenter from "@willfarrell-ds/svelte/components/LayoutCenter.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Abbr from "@willfarrell-ds/svelte/elements/abbr.svelte";
import Address from "@willfarrell-ds/svelte/elements/address.svelte";
import Article from "@willfarrell-ds/svelte/elements/article.svelte";
import B from "@willfarrell-ds/svelte/elements/b.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Del from "@willfarrell-ds/svelte/elements/del.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import Em from "@willfarrell-ds/svelte/elements/em.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import Hgroup from "@willfarrell-ds/svelte/elements/hgroup.svelte";
import I from "@willfarrell-ds/svelte/elements/i.svelte";
import Img from "@willfarrell-ds/svelte/elements/img.svelte";
import Ins from "@willfarrell-ds/svelte/elements/ins.svelte";
import Kbd from "@willfarrell-ds/svelte/elements/kbd.svelte";
import Label from "@willfarrell-ds/svelte/elements/label.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Main from "@willfarrell-ds/svelte/elements/main.svelte";
import Mark from "@willfarrell-ds/svelte/elements/mark.svelte";
import Nav from "@willfarrell-ds/svelte/elements/nav.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import S from "@willfarrell-ds/svelte/elements/s.svelte";
import Section from "@willfarrell-ds/svelte/elements/section.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Strong from "@willfarrell-ds/svelte/elements/strong.svelte";
import Sub from "@willfarrell-ds/svelte/elements/sub.svelte";
import Sup from "@willfarrell-ds/svelte/elements/sup.svelte";
import Time from "@willfarrell-ds/svelte/elements/time.svelte";
import U from "@willfarrell-ds/svelte/elements/u.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import Var from "@willfarrell-ds/svelte/elements/var.svelte";
import { paragraph } from "#examples/index.js";

const errors = [
	// { id: 'text', message: 'input error message' },
	// { id: 'textarea', message: 'input error message' }
	// { id: 'select', message: 'input error message' },
	// { id: 'checkbox', message: 'input error message' }
];
const label = "What are the details?";
const hint = paragraph;
</script>

<svelte:head>
	<title>Form | Layout | Design System</title>
	<meta name="description" content="A semantic fluid design system" />
</svelte:head>

<LayoutCenter class="container form">
	<Section>
		<A href="#" class="back">Back</A>
		<FormErrors {errors}>
			<H2>There's a problem</H2>
		</FormErrors>

		<Form method="GET" is="ds-form-submit">
			<H1><Label for="textarea">{label}</Label></H1>
			<InputTextarea id="textarea" {hint} error={errors} />
			<ButtonSubmit>Submit</ButtonSubmit>
		</Form>

		<!-- <br />
		<br />
		<br />
		<Hgroup>
			<HSub>Group</HSub>
			<H1>Text</H1>
		</Hgroup>
		<P>Description</P>
		<Form method="GET" is="ds-form-submit">
			<InputText id="text" {label} {hint} error={errors} />
			<ButtonSubmit>Submit</ButtonSubmit>
		</Form>

		<Form method="GET" is="ds-form-submit">
			<InputText id="text" {label} {labelSnippet} {hint} error={errors} />
			<ButtonSubmit>Submit</ButtonSubmit>
		</Form> -->

		<!-- <br />
		<br />
		<br />
		<Hgroup>
			<HSub>Group</HSub>
			<H1>Select</H1>
		</Hgroup>
		<P>Description</P>
		<Form method="GET" is="ds-form-submit">
			<InputSelect id="textarea" {label} {hint} error={errors} />
			<ButtonSubmit>Submit</ButtonSubmit>
		</Form>
		<Form method="GET" is="ds-form-submit">
			<InputSelect id="text" name="text" {label} {labelSnippet} {hint} error={errors}></InputSelect>
			<ButtonSubmit>Submit</ButtonSubmit>
		</Form>

		<br />
		<br />
		<br />
		<Hgroup>
			<HSub>Group</HSub>
			<H1>Fieldset</H1>
		</Hgroup>
		<P>Description</P>
		<Form method="GET" is="ds-form-submit">
			<Fieldset id="checkbox" legend={label} value={['a']} error={errors}>
				<InputCheckbox label="A" hint="hint" value="a" />
				<InputCheckbox label="B" hint="hint" value="b" />
			</Fieldset>
			<ButtonSubmit>Submit</ButtonSubmit>
		</Form>
		<Form method="GET" is="ds-form-submit">
			<Fieldset
				id="checkbox"
				legend={label}
				legendSnippet={labelSnippet}
				value={['a']}
				error={errors}
			>
				<InputCheckbox label="A" hint="hint" value="a" />
				<InputCheckbox label="B" hint="hint" value="b" />
			</Fieldset>
			<ButtonSubmit>Submit</ButtonSubmit>
		</Form> -->
	</Section>
</LayoutCenter>

<style global>
	/* html:has(.form) {
				scroll-snap-type: y mandatory;
				-webkit-overflow-scrolling: touch;
			}
			html:has(.form) > * {
				scroll-snap-align: start;
			} */
			.form {
				min-block-size: 100svh;
			}
</style>
