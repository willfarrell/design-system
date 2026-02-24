<script>
import Button from "@design-system/svelte/element/button.svelte";
import Form from "@design-system/svelte/element/form.svelte";
import FormErrors from "@design-system/svelte/FormErrors.svelte";
import InputFile from "@design-system/svelte/InputFile.svelte";
</script>

<Form method="POST">
	<InputFile
		id="file"
		label="File w/ dropzone"
		hint="Choose file with .csv"
		accept=".csv,text/csv"
	/>
	<Button>Submit</Button>
</Form>
