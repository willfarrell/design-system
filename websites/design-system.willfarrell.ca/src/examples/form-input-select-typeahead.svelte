<script>
import FieldHgroupSnippet from "@willfarrell-ds/svelte/components/FieldHgroupSnippet.svelte";
import FieldOption from "@willfarrell-ds/svelte/components/FieldOption.svelte";
import InputSelectTypeahead from "@willfarrell-ds/svelte/components/InputSelectTypeahead.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
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
