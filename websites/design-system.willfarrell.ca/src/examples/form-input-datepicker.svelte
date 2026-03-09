<script>
import FieldHgroupSnippet from "@design-system/components/FieldHgroupSnippet.svelte";
import InputDate from "@design-system/components/InputDate.svelte";
import A from "@design-system/elements/a.svelte";
import Button from "@design-system/elements/button.svelte";
import Form from "@design-system/elements/form.svelte";
import P from "@design-system/elements/p.svelte";
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
