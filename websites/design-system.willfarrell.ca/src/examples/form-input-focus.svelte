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
</script>

<Form method="POST">
	<InputText id="text-focus" label="Text" class="force focus" />
	<InputTextarea id="textarea-focus" label="Textarea" class="force focus" />
	<InputSelect id="select-focus" label="Select" class="force focus">
		<FieldOption label="A" value="a" />
		<FieldOption label="B" value="b" />
	</InputSelect>
	<Fieldset id="checkbox-focus" label="Checkboxes" value={['a']} class="force focus">
		<InputCheckbox label="A" hint="hint" value="a" />
		<InputCheckbox label="B" hint="hint" value="b" />
	</Fieldset>
	<Fieldset id="radio-focus" label="Radios" value="a" class="force focus">
		<InputRadio label="A" hint="hint" value="a" />
		<InputRadio label="B" hint="hint" value="b" />
	</Fieldset>
	<InputFile id="file-focus" label="File" button="Choose file" class="force focus" />
	<Button>Submit</Button>
</Form>
