<script>
import FieldHgroupSnippet from "@design-system/components/FieldHgroupSnippet.svelte";
import Fieldset from "@design-system/components/Fieldset.svelte";
import FormErrors from "@design-system/components/FormErrors.svelte";
import InputCheckbox from "@design-system/components/InputCheckbox.svelte";
import A from "@design-system/elements/a.svelte";
import Button from "@design-system/elements/button.svelte";
import Form from "@design-system/elements/form.svelte";
import P from "@design-system/elements/p.svelte";
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
