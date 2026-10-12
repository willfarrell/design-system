<script>
import FieldOptgroup from "@willfarrell-ds/svelte/components/FieldOptgroup.svelte";
import FieldOption from "@willfarrell-ds/svelte/components/FieldOption.svelte";
import Fieldset from "@willfarrell-ds/svelte/components/Fieldset.svelte";
import FormErrors from "@willfarrell-ds/svelte/components/FormErrors.svelte";
import InputCheckbox from "@willfarrell-ds/svelte/components/InputCheckbox.svelte";
import InputEmail from "@willfarrell-ds/svelte/components/InputEmail.svelte";
import InputFile from "@willfarrell-ds/svelte/components/InputFile.svelte";
import InputHidden from "@willfarrell-ds/svelte/components/InputHidden.svelte";
import InputNumber from "@willfarrell-ds/svelte/components/InputNumber.svelte";
import InputOneTimeCode from "@willfarrell-ds/svelte/components/InputOneTimeCode.svelte";
import InputPasswordGet from "@willfarrell-ds/svelte/components/InputPasswordGet.svelte";
import InputRadio from "@willfarrell-ds/svelte/components/InputRadio.svelte";
import InputSearch from "@willfarrell-ds/svelte/components/InputSearch.svelte";
import InputSelect from "@willfarrell-ds/svelte/components/InputSelect.svelte";
import InputText from "@willfarrell-ds/svelte/components/InputText.svelte";
import InputTextarea from "@willfarrell-ds/svelte/components/InputTextarea.svelte";
import InputUrl from "@willfarrell-ds/svelte/components/InputUrl.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import Search from "@willfarrell-ds/svelte/elements/search.svelte";

const error = [
	{ id: "text-err", message: "text error message" },
	{ id: "textarea-err", message: "textarea error message" },
	{ id: "select-err", message: "select error message" },
	{ id: "checkbox-err", message: "checkbox error message" },
	{ id: "radio-err", message: "radio error message" },
	{ id: "file-err", message: "file error message" },
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
