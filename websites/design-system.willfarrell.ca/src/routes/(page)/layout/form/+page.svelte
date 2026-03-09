<script>
import ButtonSubmit from "@design-system/components/ButtonSubmit.svelte";
import Fieldset from "@design-system/components/Fieldset.svelte";
import FormErrors from "@design-system/components/FormErrors.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import InputCheckbox from "@design-system/components/InputCheckbox.svelte";
import InputSelect from "@design-system/components/InputSelect.svelte";
import InputText from "@design-system/components/InputText.svelte";
import InputTextarea from "@design-system/components/InputTextarea.svelte";
import LayoutCenter from "@design-system/components/LayoutCenter.svelte";
import A from "@design-system/elements/a.svelte";
import Abbr from "@design-system/elements/abbr.svelte";
import Address from "@design-system/elements/address.svelte";
import Article from "@design-system/elements/article.svelte";
import B from "@design-system/elements/b.svelte";
import Button from "@design-system/elements/button.svelte";
import Code from "@design-system/elements/code.svelte";
import Del from "@design-system/elements/del.svelte";
import Div from "@design-system/elements/div.svelte";
import Em from "@design-system/elements/em.svelte";
import Form from "@design-system/elements/form.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import I from "@design-system/elements/i.svelte";
import Img from "@design-system/elements/img.svelte";
import Ins from "@design-system/elements/ins.svelte";
import Kbd from "@design-system/elements/kbd.svelte";
import Li from "@design-system/elements/li.svelte";
import Main from "@design-system/elements/main.svelte";
import Mark from "@design-system/elements/mark.svelte";
import Nav from "@design-system/elements/nav.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";
import S from "@design-system/elements/s.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Strong from "@design-system/elements/strong.svelte";
import Sub from "@design-system/elements/sub.svelte";
import Sup from "@design-system/elements/sup.svelte";
import Time from "@design-system/elements/time.svelte";
import U from "@design-system/elements/u.svelte";
import Ul from "@design-system/elements/ul.svelte";
import Var from "@design-system/elements/var.svelte";
import { paragraph } from "@examples/index.js";

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

		{#snippet labelSnippet(label)}
			<H1>{label}</H1>
		{/snippet}

		<Form method="GET" is="ds-form-submit">
			<InputTextarea id="textarea" {label} {labelSnippet} {hint} error={errors} />
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
