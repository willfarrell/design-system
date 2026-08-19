<script>
import FieldHgroupSnippet from "@design-system/components/FieldHgroupSnippet.svelte";
import FieldOption from "@design-system/components/FieldOption.svelte";
import InputSelectTypeahead from "@design-system/components/InputSelectTypeahead.svelte";
import A from "@design-system/elements/a.svelte";
import Button from "@design-system/elements/button.svelte";
import Form from "@design-system/elements/form.svelte";
import P from "@design-system/elements/p.svelte";
</script>

{#snippet labelSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<InputSelectTypeahead id="country" {labelSnippet} label="Country" hint="Start typing to filter the list">
		<FieldOption label="" value="" />
		<FieldOption label="Australia" value="AU" />
		<FieldOption label="Brazil" value="BR" />
		<FieldOption label="Canada" value="CA" />
		<FieldOption label="France" value="FR" />
		<FieldOption label="Germany" value="DE" />
		<FieldOption label="Japan" value="JP" />
		<FieldOption label="United Kingdom" value="GB" />
		<FieldOption label="United States" value="US" />
	</InputSelectTypeahead>
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-select-typeahead" target="_top">View our guidance</A></P>
</Form>
