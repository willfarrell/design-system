<script>
import Button from "@design-system/svelte/element/button.svelte";
import Div from "@design-system/svelte/element/div.svelte";
import Form from "@design-system/svelte/element/form.svelte";
import Search from "@design-system/svelte/element/search.svelte";
import Span from "@design-system/svelte/element/span.svelte";
import FieldOptgroup from "@design-system/svelte/FieldOptgroup.svelte";
import FieldOption from "@design-system/svelte/FieldOption.svelte";
import Fieldset from "@design-system/svelte/Fieldset.svelte";
import FormErrors from "@design-system/svelte/FormErrors.svelte";
import Icon from "@design-system/svelte/Icon.svelte";
import InputCheckbox from "@design-system/svelte/InputCheckbox.svelte";
import InputEmail from "@design-system/svelte/InputEmail.svelte";
import InputFile from "@design-system/svelte/InputFile.svelte";
import InputHidden from "@design-system/svelte/InputHidden.svelte";
import InputNumber from "@design-system/svelte/InputNumber.svelte";
import InputOneTimeCode from "@design-system/svelte/InputOneTimeCode.svelte";
import InputPasswordGet from "@design-system/svelte/InputPasswordGet.svelte";
import InputRadio from "@design-system/svelte/InputRadio.svelte";
import InputSearch from "@design-system/svelte/InputSearch.svelte";
import InputSelect from "@design-system/svelte/InputSelect.svelte";
import InputText from "@design-system/svelte/InputText.svelte";
import InputTextarea from "@design-system/svelte/InputTextarea.svelte";
import InputUrl from "@design-system/svelte/InputUrl.svelte";
</script>

<Search>
	<Form method="GET" role="group">
		<Div>
			<InputSearch id="q" label="Search" />
			<Button><Icon src="/img/icons.svg#search" /><Span>Search</Span></Button>
		</Div>
	</Form>
</Search>
