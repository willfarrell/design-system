<script>
import FieldHgroupSnippet from "@design-system/components/FieldHgroupSnippet.svelte";
import FormErrors from "@design-system/components/FormErrors.svelte";
import InputFile from "@design-system/components/InputFile.svelte";
import A from "@design-system/elements/a.svelte";
import Button from "@design-system/elements/button.svelte";
import Form from "@design-system/elements/form.svelte";
import P from "@design-system/elements/p.svelte";
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
