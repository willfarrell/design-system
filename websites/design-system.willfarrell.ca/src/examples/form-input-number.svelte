<script>
import FieldHgroupSnippet from "@willfarrell-ds/svelte/components/FieldHgroupSnippet.svelte";
import FieldInput from "@willfarrell-ds/svelte/components/FieldInput.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
</script>

{#snippet labelSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<FieldInput id="number" {labelSnippet} label="Number" hint="Should be prime and greater than 99" type="number" size="3" />
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-number" target="_top">View our guidance</A></P>
</Form>
