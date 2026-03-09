<script>
import FieldHgroupSnippet from "@design-system/components/FieldHgroupSnippet.svelte";
import FieldOptgroup from "@design-system/components/FieldOptgroup.svelte";
import FieldOption from "@design-system/components/FieldOption.svelte";
import Fieldset from "@design-system/components/Fieldset.svelte";
import FormErrors from "@design-system/components/FormErrors.svelte";
import Icon from "@design-system/components/Icon.svelte";
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
import A from "@design-system/elements/a.svelte";
import Button from "@design-system/elements/button.svelte";
import Div from "@design-system/elements/div.svelte";
import Form from "@design-system/elements/form.svelte";
import P from "@design-system/elements/p.svelte";
import Search from "@design-system/elements/search.svelte";
import Span from "@design-system/elements/span.svelte";
</script>

{#snippet labelSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Search>
	<Form method="GET" role="group">
		<Div>
			<InputSearch id="q" {labelSnippet} label="Search" />
			<Button><Icon src="/img/icons.svg#search" /><Span>Search</Span></Button>
		</Div>
		<P>Need help? <A href="/form/input-search" target="_top">View our guidance</A></P>
	</Form>
</Search>
