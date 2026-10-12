<script>
import FieldHgroupSnippet from "@willfarrell-ds/svelte/components/FieldHgroupSnippet.svelte";
import Fieldset from "@willfarrell-ds/svelte/components/Fieldset.svelte";
import FormErrors from "@willfarrell-ds/svelte/components/FormErrors.svelte";
import InputCheckbox from "@willfarrell-ds/svelte/components/InputCheckbox.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
</script>

{#snippet legendSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<Fieldset id="checkbox" {legendSnippet} label="Checkboxes" value={['a']} hint="legend hint">
		<InputCheckbox label="Option a" hint="label hint" value="a" />
		<InputCheckbox label="Option b" hint="label hint" value="b" />
	</Fieldset>
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-checkbox" target="_top">View our guidance</A></P>
</Form>
