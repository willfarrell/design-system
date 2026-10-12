<script>
import FieldHgroupSnippet from "@willfarrell-ds/svelte/components/FieldHgroupSnippet.svelte";
import InputUsername from "@willfarrell-ds/svelte/components/InputUsername.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
</script>

{#snippet labelSnippet(label)}
    <FieldHgroupSnippet {label}/>
{/snippet}
<Form method="POST">
	<InputUsername id="username" {labelSnippet} label="Username" hint="The name you sign in with" />
	<Button>Submit</Button>
	<P>Need help? <A href="/form/input-username" target="_top">View our guidance</A></P>
</Form>
