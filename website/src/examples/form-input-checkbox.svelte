<script>
	import FormErrors from '@design-system/svelte/FormErrors.svelte';
	import Form from '@design-system/svelte/element/form.svelte';
	import Fieldset from '@design-system/svelte/Fieldset.svelte';
	import InputCheckbox from '@design-system/svelte/InputCheckbox.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
</script>

<Form method="POST">
	<Fieldset id="checkbox" label="Checkboxes" value={['a']} hint="legend hint">
		<InputCheckbox label="Option a" hint="label hint" value="a" />
		<InputCheckbox label="Option b" hint="label hint" value="b" />
	</Fieldset>
	<Button>Submit</Button>
</Form>
