<script>
import FieldHgroupSnippet from "@willfarrell-ds/svelte/components/FieldHgroupSnippet.svelte";
import FieldOptgroup from "@willfarrell-ds/svelte/components/FieldOptgroup.svelte";
import FieldOption from "@willfarrell-ds/svelte/components/FieldOption.svelte";
import Fieldset from "@willfarrell-ds/svelte/components/Fieldset.svelte";
import FormErrors from "@willfarrell-ds/svelte/components/FormErrors.svelte";
import InputCheckbox from "@willfarrell-ds/svelte/components/InputCheckbox.svelte";
import InputEmail from "@willfarrell-ds/svelte/components/InputEmail.svelte";
import InputFile from "@willfarrell-ds/svelte/components/InputFile.svelte";
import InputHidden from "@willfarrell-ds/svelte/components/InputHidden.svelte";
import InputName from "@willfarrell-ds/svelte/components/InputName.svelte";
import InputNumber from "@willfarrell-ds/svelte/components/InputNumber.svelte";
import InputOneTimeCode from "@willfarrell-ds/svelte/components/InputOneTimeCode.svelte";
import InputPasswordGet from "@willfarrell-ds/svelte/components/InputPasswordGet.svelte";
import InputRadio from "@willfarrell-ds/svelte/components/InputRadio.svelte";
import InputSearch from "@willfarrell-ds/svelte/components/InputSearch.svelte";
import InputSelect from "@willfarrell-ds/svelte/components/InputSelect.svelte";
import InputTel from "@willfarrell-ds/svelte/components/InputTel.svelte";
import InputText from "@willfarrell-ds/svelte/components/InputText.svelte";
import InputTextarea from "@willfarrell-ds/svelte/components/InputTextarea.svelte";
import InputUrl from "@willfarrell-ds/svelte/components/InputUrl.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Search from "@willfarrell-ds/svelte/elements/search.svelte";
</script>

{#snippet labelSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<InputPasswordGet
		{labelSnippet}
		id="password"
		label="Password"
		hint="You should probably use PassKeys instead"
	/>
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-password" target="_top">View our guidance</A></P>
</Form>
