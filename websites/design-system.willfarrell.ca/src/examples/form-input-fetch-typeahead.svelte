<script>
import FieldHgroupSnippet from "@willfarrell-ds/svelte/components/FieldHgroupSnippet.svelte";
import FieldOption from "@willfarrell-ds/svelte/components/FieldOption.svelte";
import InputFetchTypeahead from "@willfarrell-ds/svelte/components/InputFetchTypeahead.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
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
