<script>
import FieldHgroupSnippet from "@design-system/components/FieldHgroupSnippet.svelte";
import FieldOption from "@design-system/components/FieldOption.svelte";
import Fieldset from "@design-system/components/Fieldset.svelte";
import InputAddressCity from "@design-system/components/InputAddressCity.svelte";
import InputAddressCountry from "@design-system/components/InputAddressCountry.svelte";
import InputAddressPostalCode from "@design-system/components/InputAddressPostalCode.svelte";
import InputAddressStreet from "@design-system/components/InputAddressStreet.svelte";
import InputOrganization from "@design-system/components/InputOrganization.svelte";
import A from "@design-system/elements/a.svelte";
import Button from "@design-system/elements/button.svelte";
import Form from "@design-system/elements/form.svelte";
import P from "@design-system/elements/p.svelte";
</script>

{#snippet legendSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<Fieldset {legendSnippet} class="address">
		<InputOrganization id="organization" label="Organization" hint="" />
		<InputAddressStreet id="street-address" label="Street address" hint="#000, 123 Home Street" />
		<InputAddressCity id="city" label="City" hint="" />
		<InputAddressPostalCode id="postal-code" label="Postal code, postcode, or ZIP" hint="A1A 1A1" />
		<InputAddressCountry id="country" label="Country or region" hint="">
			<FieldOption label="Canada" value="CA" />
		</InputAddressCountry>
	</Fieldset>
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-address" target="_top">View our guidance</A></P>
</Form>
