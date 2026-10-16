<script>
import FieldHgroupSnippet from "@willfarrell-ds/svelte/components/FieldHgroupSnippet.svelte";
import InputDate from "@willfarrell-ds/svelte/components/InputDate.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
</script>

{#snippet labelSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<InputDate id="date" {labelSnippet} label="Date of your last adventure" />
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-date" target="_top">View our guidance</A></P>
</Form>
