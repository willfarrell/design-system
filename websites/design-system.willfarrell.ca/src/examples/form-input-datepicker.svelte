<script>
import Button from "@design-system/svelte/element/button.svelte";
import Div from "@design-system/svelte/element/div.svelte";
import Form from "@design-system/svelte/element/form.svelte";
import Search from "@design-system/svelte/element/search.svelte";
import FieldOptgroup from "@design-system/svelte/FieldOptgroup.svelte";
import FieldOption from "@design-system/svelte/FieldOption.svelte";
import Fieldset from "@design-system/svelte/Fieldset.svelte";
import FormErrors from "@design-system/svelte/FormErrors.svelte";
import InputCheckbox from "@design-system/svelte/InputCheckbox.svelte";
import InputDate from "@design-system/svelte/InputDate.svelte";
import InputEmail from "@design-system/svelte/InputEmail.svelte";
import InputFile from "@design-system/svelte/InputFile.svelte";
import InputHidden from "@design-system/svelte/InputHidden.svelte";
import InputNumber from "@design-system/svelte/InputNumber.svelte";
import InputOneTimeCode from "@design-system/svelte/InputOneTimeCode.svelte";
import InputPasswordGet from "@design-system/svelte/InputPasswordGet.svelte";
import InputRadio from "@design-system/svelte/InputRadio.svelte";
import InputSearch from "@design-system/svelte/InputSearch.svelte";
import InputSelect from "@design-system/svelte/InputSelect.svelte";
import InputTel from "@design-system/svelte/InputTel.svelte";
import InputText from "@design-system/svelte/InputText.svelte";
import InputTextarea from "@design-system/svelte/InputTextarea.svelte";
import InputUrl from "@design-system/svelte/InputUrl.svelte";

const error = [{ id: "dob", message: "error message" }];
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
