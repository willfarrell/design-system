<script>
	import { paragraph } from '@examples/index.js';
	import LayoutCenter from '@design-system/svelte/LayoutCenter.svelte';

	import A from '@design-system/svelte/element/a.svelte';
	import FormErrors from '@design-system/svelte/FormErrors.svelte';
	import Form from '@design-system/svelte/element/form.svelte';
	import Fieldset from '@design-system/svelte/Fieldset.svelte';
	import InputText from '@design-system/svelte/InputText.svelte';
	import InputTextarea from '@design-system/svelte/InputTextarea.svelte';
	import InputSelect from '@design-system/svelte/InputSelect.svelte';
	import InputCheckbox from '@design-system/svelte/InputCheckbox.svelte';

	import Div from '@design-system/svelte/element/div.svelte';
	import Nav from '@design-system/svelte/element/nav.svelte';
	import Main from '@design-system/svelte/element/main.svelte';
	import Article from '@design-system/svelte/element/article.svelte';
	import Section from '@design-system/svelte/element/section.svelte';
	import Hgroup from '@design-system/svelte/element/hgroup.svelte';
	import H1 from '@design-system/svelte/Heading1.svelte';
	import HSub from '@design-system/svelte/HeadingSub.svelte';
	import Time from '@design-system/svelte/element/time.svelte';
	import H2 from '@design-system/svelte/Heading2.svelte';
	import P from '@design-system/svelte/element/p.svelte';
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

	import ButtonSubmit from '@design-system/svelte/ButtonSubmit.svelte';

	const errors = [
		// { id: 'text', message: 'input error message' },
		// { id: 'textarea', message: 'input error message' }
		// { id: 'select', message: 'input error message' },
		// { id: 'checkbox', message: 'input error message' }
	];
	const label = 'What are the details?';
	const hint = paragraph;
</script>

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
		min-height: 100vh;
	}
</style>
