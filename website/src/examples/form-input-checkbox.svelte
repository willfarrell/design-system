<script>
	import FormErrors from '@design-system/svelte/FormErrors.svelte';
	import Form from '@design-system/svelte/element/form.svelte';
	import Fieldset from '@design-system/svelte/Fieldset.svelte';
	import InputCheckbox from '@design-system/svelte/InputCheckbox.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
</script>

<Form method="POST">
	<Fieldset id="checkbox" label="Checkboxes" value={['a']}>
		<InputCheckbox label="A" hint="hint" value="a" />
		<InputCheckbox label="B" hint="hint" value="b" />
	</Fieldset>
	<Button>Submit</Button>
</Form>
