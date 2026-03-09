<script>
import FieldHgroupSnippet from "@design-system/components/FieldHgroupSnippet.svelte";
import InputDate from "@design-system/components/InputDate.svelte";
import A from "@design-system/elements/a.svelte";
import Button from "@design-system/elements/button.svelte";
import Form from "@design-system/elements/form.svelte";
import P from "@design-system/elements/p.svelte";
</script>

{#snippet labelSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<InputDate id="date" {labelSnippet} label="Date of your last adventure" />
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-date" target="_top">View our guidance</A></P>
</Form>
