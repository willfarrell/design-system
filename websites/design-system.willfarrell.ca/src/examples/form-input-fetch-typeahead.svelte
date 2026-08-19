<script>
import FieldHgroupSnippet from "@design-system/components/FieldHgroupSnippet.svelte";
import FieldOption from "@design-system/components/FieldOption.svelte";
import InputFetchTypeahead from "@design-system/components/InputFetchTypeahead.svelte";
import A from "@design-system/elements/a.svelte";
import Button from "@design-system/elements/button.svelte";
import Form from "@design-system/elements/form.svelte";
import P from "@design-system/elements/p.svelte";
</script>

{#snippet labelSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<InputFetchTypeahead
		id="country"
		{labelSnippet}
		label="Country"
		hint="Start typing to search countries"
		src="/api/fetch-typeahead.json"
	>
		<FieldOption value="Australia" />
		<FieldOption value="Brazil" />
		<FieldOption value="Canada" />
		<FieldOption value="France" />
		<FieldOption value="Germany" />
		<FieldOption value="India" />
		<FieldOption value="Japan" />
		<FieldOption value="Mexico" />
		<FieldOption value="United Kingdom" />
		<FieldOption value="United States" />
	</InputFetchTypeahead>
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-fetch-typeahead" target="_top">View our guidance</A></P>
</Form>
