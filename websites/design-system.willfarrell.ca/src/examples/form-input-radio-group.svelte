<script>
import FieldHgroupSnippet from "@design-system/components/FieldHgroupSnippet.svelte";
import Fieldset from "@design-system/components/Fieldset.svelte";
import InputRadio from "@design-system/components/InputRadio.svelte";
import A from "@design-system/elements/a.svelte";
import Button from "@design-system/elements/button.svelte";
import Form from "@design-system/elements/form.svelte";
import P from "@design-system/elements/p.svelte";
</script>

{#snippet legendSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<Fieldset id="radio-group" {legendSnippet} label="Radios with groups" hint="legend hint">
		<Fieldset id="radio-group-one" name="radio-group" legend="Group one" value="a">
			<InputRadio label="Option a" hint="label hint" value="a" />
			<InputRadio label="Option b" hint="label hint" value="b" />
		</Fieldset>
		<Fieldset id="radio-group-two" name="radio-group" legend="Group two">
			<InputRadio label="Option c" hint="label hint" value="c" />
			<InputRadio label="Option d" hint="label hint" value="d" />
		</Fieldset>
	</Fieldset>
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-radio" target="_top">View our guidance</A></P>
</Form>
