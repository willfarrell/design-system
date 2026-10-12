<script>
import FieldHgroupSnippet from "@willfarrell-ds/svelte/components/FieldHgroupSnippet.svelte";
import InputDate from "@willfarrell-ds/svelte/components/InputDate.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
</script>

<!--
Note: size diff on each browser
Chrome: width of 0
Safari: width of 0
Firefox: width of M
Expected: width of M, when inputmode="numeric" uses with of 0
-->
{#snippet labelSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<InputDate id="date" {labelSnippet} label="Date" />
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-date" target="_top">View our guidance</A></P>
</Form>
