<script>
	import Div from '@design-system/svelte/element/div.svelte';
	import FormErrors from '@design-system/svelte/FormErrors.svelte';
	import Form from '@design-system/svelte/element/form.svelte';
	import Search from '@design-system/svelte/element/search.svelte';
	import Fieldset from '@design-system/svelte/Fieldset.svelte';
	import FieldOptgroup from '@design-system/svelte/FieldOptgroup.svelte';
	import FieldOption from '@design-system/svelte/FieldOption.svelte';
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
	import InputDate from '@design-system/svelte/InputDate.svelte';
	import InputTel from '@design-system/svelte/InputTel.svelte';
	import InputUrl from '@design-system/svelte/InputUrl.svelte';
	import InputSearch from '@design-system/svelte/InputSearch.svelte';
	import InputSelect from '@design-system/svelte/InputSelect.svelte';
	import InputTextarea from '@design-system/svelte/InputTextarea.svelte';
	import Button from '@design-system/svelte/element/button.svelte';

	const error = [{ id: 'dob', message: 'error message' }];
</script>

<!-- 
Note: size diff on each browser
Chrome: width of 0
Safari: width of 0
Firefox: width of M
Expected: width of M, when inputmode="numeric" uses with of 0
-->
<Form method="POST">
	<InputDate id="date" label="Date" />
	<Button>Submit</Button>
</Form>
