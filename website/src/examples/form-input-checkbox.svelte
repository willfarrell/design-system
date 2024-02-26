<script>
	import FormErrors from '@design-system/svelte/FormErrors.svelte';
	import Form from '@design-system/svelte/element/form.svelte';
	import Search from '@design-system/svelte/element/search.svelte';
	import Fieldset from '@design-system/svelte/Fieldset.svelte';
	import InputCheckbox from '@design-system/svelte/InputCheckbox.svelte';
	import InputEmail from '@design-system/svelte/InputEmail.svelte';
	import InputFile from '@design-system/svelte/InputFile.svelte';
	import InputFileDropzone from '@design-system/svelte/InputFileDropzone.svelte';
	import InputHidden from '@design-system/svelte/InputHidden.svelte';
	import InputNumber from '@design-system/svelte/InputNumber.svelte';
	import InputOneTimeCode from '@design-system/svelte/InputOneTimeCode.svelte';
	import InputPassword from '@design-system/svelte/InputPassword.svelte';
	import InputRadio from '@design-system/svelte/InputRadio.svelte';
	import InputText from '@design-system/svelte/InputText.svelte';
	import InputUrl from '@design-system/svelte/InputUrl.svelte';
	import InputSearch from '@design-system/svelte/InputSearch.svelte';
	import InputSelectAutocomplete from '@design-system/svelte/InputSelectAutocomplete.svelte';
	import InputSelect from '@design-system/svelte/InputSelect.svelte';
	import InputTextarea from '@design-system/svelte/InputTextarea.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
</script>

<Form method="POST">
	<Fieldset id="checkbox" label="Checkboxes" value={['a']}>
		<InputCheckbox label="A" hint="hint" value="a" />
		<InputCheckbox label="B" hint="hint" value="b" />
	</Fieldset>
	<Button>Submit</Button>
</Form>
