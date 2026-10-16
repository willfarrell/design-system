<script>
import FieldHgroupSnippet from "@willfarrell-ds/svelte/components/FieldHgroupSnippet.svelte";
import FieldOption from "@willfarrell-ds/svelte/components/FieldOption.svelte";
import Fieldset from "@willfarrell-ds/svelte/components/Fieldset.svelte";
import InputAddressCity from "@willfarrell-ds/svelte/components/InputAddressCity.svelte";
import InputAddressCountry from "@willfarrell-ds/svelte/components/InputAddressCountry.svelte";
import InputAddressPostalCode from "@willfarrell-ds/svelte/components/InputAddressPostalCode.svelte";
import InputAddressStreet from "@willfarrell-ds/svelte/components/InputAddressStreet.svelte";
import InputOrganization from "@willfarrell-ds/svelte/components/InputOrganization.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
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
