<script>
import FieldHgroupSnippet from "@design-system/components/FieldHgroupSnippet.svelte";
import FieldInput from "@design-system/components/FieldInput.svelte";
import A from "@design-system/elements/a.svelte";
import Button from "@design-system/elements/button.svelte";
import Form from "@design-system/elements/form.svelte";
import P from "@design-system/elements/p.svelte";
</script>

{#snippet labelSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<FieldInput id="number" {labelSnippet} label="Number" hint="Should be prime and greater than 99" type="number" size="3" />
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-number" target="_top">View our guidance</A></P>
</Form>
