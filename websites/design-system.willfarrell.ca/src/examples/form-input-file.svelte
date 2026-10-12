<script>
import FieldHgroupSnippet from "@willfarrell-ds/svelte/components/FieldHgroupSnippet.svelte";
import FormErrors from "@willfarrell-ds/svelte/components/FormErrors.svelte";
import InputFile from "@willfarrell-ds/svelte/components/InputFile.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
</script>

{#snippet labelSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<InputFile
		{labelSnippet}
		id="file"
		label="File w/ dropzone"
		hint="Choose file with .csv"
		accept=".csv,text/csv"
	/>
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-file" target="_top">View our guidance</A></P>
</Form>
