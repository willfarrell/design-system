<script>
	import Form from '@design-system/svelte/element/form.svelte';
	import Fieldset from '@design-system/svelte/Fieldset.svelte';

	import InputAddressStreet from '@design-system/svelte/InputAddressStreet.svelte';
	import InputAddressCity from '@design-system/svelte/InputAddressCity.svelte';
	import InputAddressPostalCode from '@design-system/svelte/InputAddressPostalCode.svelte';
	import InputAddressCountry from '@design-system/svelte/InputAddressCountry.svelte';
	import FieldOption from '@design-system/svelte/FieldOption.svelte';

	import Button from '@design-system/svelte/element/button.svelte';
</script>

<Form method="POST">
	<Fieldset>
		<InputAddressStreet id="street-address" label="Street address" hint="#000, 123 Home Street" />
		<InputAddressCity id="city" label="City" hint="" />
		<InputAddressPostalCode id="postal-code" label="Postal code, postcode, or ZIP" hint="A1A 1A1" />
		<InputAddressCountry id="country" label="Country or region" hint="">
			<FieldOption label="Canada" value="CA" />
		</InputAddressCountry>
	</Fieldset>
	<Button>Submit</Button>
</Form>
