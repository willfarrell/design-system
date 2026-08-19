<script>
import FieldHgroupSnippet from "@design-system/components/FieldHgroupSnippet.svelte";
import Fieldset from "@design-system/components/Fieldset.svelte";
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
	<Fieldset id="checkbox-group" {legendSnippet} label="Checkboxes with groups" hint="legend hint">
		<Fieldset id="checkbox-group-one" name="checkbox-group" legend="Group one" value={['a']}>
			<InputCheckbox label="Option a" hint="label hint" value="a" />
			<InputCheckbox label="Option b" hint="label hint" value="b" />
		</Fieldset>
		<Fieldset id="checkbox-group-two" name="checkbox-group" legend="Group two">
			<InputCheckbox label="Option c" hint="label hint" value="c" />
			<InputCheckbox label="Option d" hint="label hint" value="d" />
		</Fieldset>
	</Fieldset>
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-checkbox" target="_top">View our guidance</A></P>
</Form>
