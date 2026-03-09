<script>
import FieldOptgroup from "@design-system/components/FieldOptgroup.svelte";
import FieldOption from "@design-system/components/FieldOption.svelte";
import Fieldset from "@design-system/components/Fieldset.svelte";
import FormErrors from "@design-system/components/FormErrors.svelte";
import InputCheckbox from "@design-system/components/InputCheckbox.svelte";
import InputEmail from "@design-system/components/InputEmail.svelte";
import InputFile from "@design-system/components/InputFile.svelte";
import InputHidden from "@design-system/components/InputHidden.svelte";
import InputNumber from "@design-system/components/InputNumber.svelte";
import InputOneTimeCode from "@design-system/components/InputOneTimeCode.svelte";
import InputPasswordGet from "@design-system/components/InputPasswordGet.svelte";
import InputRadio from "@design-system/components/InputRadio.svelte";
import InputSearch from "@design-system/components/InputSearch.svelte";
import InputSelect from "@design-system/components/InputSelect.svelte";
import InputText from "@design-system/components/InputText.svelte";
import InputTextarea from "@design-system/components/InputTextarea.svelte";
import InputUrl from "@design-system/components/InputUrl.svelte";
import Button from "@design-system/elements/button.svelte";
import Form from "@design-system/elements/form.svelte";
import Search from "@design-system/elements/search.svelte";

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
