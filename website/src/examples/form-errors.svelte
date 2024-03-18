<script>
	import FormErrors from '@design-system/svelte/FormErrors.svelte';
	import Form from '@design-system/svelte/element/form.svelte';
	import Search from '@design-system/svelte/element/search.svelte';
	import Fieldset from '@design-system/svelte/Fieldset.svelte';
	import FieldOptgroup from '@design-system/svelte/FieldOptgroup.svelte';
	import FieldOption from '@design-system/svelte/FieldOption.svelte';
	import InputCheckbox from '@design-system/svelte/InputCheckbox.svelte';
	import InputEmail from '@design-system/svelte/InputEmail.svelte';
	import InputFile from '@design-system/svelte/InputFile.svelte';
	import InputHidden from '@design-system/svelte/InputHidden.svelte';
	import InputNumber from '@design-system/svelte/InputNumber.svelte';
	import InputOneTimeCode from '@design-system/svelte/InputOneTimeCode.svelte';
	import InputPassword from '@design-system/svelte/InputPassword.svelte';
	import InputRadio from '@design-system/svelte/InputRadio.svelte';
	import InputText from '@design-system/svelte/InputText.svelte';
	import InputUrl from '@design-system/svelte/InputUrl.svelte';
	import InputSearch from '@design-system/svelte/InputSearch.svelte';
	import InputSelect from '@design-system/svelte/InputSelect.svelte';
	import InputTextarea from '@design-system/svelte/InputTextarea.svelte';
	import Button from '@design-system/svelte/element/button.svelte';

	const error = [
		{ id: 'text-err', message: 'text error message' },
		{ id: 'textarea-err', message: 'textarea error message' },
		{ id: 'select-err', message: 'select error message' },
		{ id: 'checkbox-err', message: 'checkbox error message' },
		{ id: 'radio-err', message: 'radio error message' },
		{ id: 'file-err', message: 'file error message' }
	];
</script>

<FormErrors errors={error}>
	<h2>Errors</h2>
</FormErrors>
<Form method="POST">
	<InputText id="text-err" label="Text" {error} />
	<InputTextarea id="textarea-err" label="Textarea" {error} />
	<InputSelect id="select-err" label="Select" {error}>
		<FieldOption label="A" value="a" />
		<FieldOption label="B" value="b" />
	</InputSelect>
	<Fieldset id="checkbox-err" label="Checkboxes" value={['a']} {error}>
		<InputCheckbox label="A" hint="hint" value="a" />
		<InputCheckbox label="B" hint="hint" value="b" />
	</Fieldset>
	<Fieldset id="radio-err" label="Radios" value="a" {error}>
		<InputRadio label="A" hint="hint" value="a" />
		<InputRadio label="B" hint="hint" value="b" />
	</Fieldset>
	<InputFile id="file-err" label="File" {error} button="Choose file" />
	<Button>Submit</Button>
</Form>
