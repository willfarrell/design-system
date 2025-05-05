<script>
	import Div from '@design-system/svelte/element/div.svelte';
	import FormErrors from '@design-system/svelte/FormErrors.svelte';
	import Form from '@design-system/svelte/element/form.svelte';
	import Fieldset from '@design-system/svelte/Fieldset.svelte';
	import InputNumber from '@design-system/svelte/InputNumber.svelte';
	import InputText from '@design-system/svelte/InputText.svelte';
	import Button from '@design-system/svelte/element/button.svelte';

	const error = [];
</script>

<!--
Note: size diff on each browser
Chrome: width of 0
Safari: width of 0
Firefox: width of M
Expected: width of M, when inputmode="numeric" uses with of 0
-->
<Form method="POST">
	<Fieldset id="dob" label="Date of your last adventure" hint="For example 2022 5 30" {error}>
		<Div role="group">
			<InputNumber id="year" label="Year" size="4" />
			<InputText id="month" label="Month" size="4" /><!-- width of 3 M when based on 0 -->
			<InputNumber id="day" label="Day" size="2" />
		</Div>
	</Fieldset>
	<Button>Submit</Button>
</Form>
