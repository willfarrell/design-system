<script>
import FieldHgroupSnippet from "@willfarrell-ds/svelte/components/FieldHgroupSnippet.svelte";
import InputPasswordCreate from "@willfarrell-ds/svelte/components/InputPasswordCreate.svelte";
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
	<InputUsername id="username" {labelSnippet} label="Username" />
	<InputPasswordCreate
		{labelSnippet}
		id="new-password"
		label="Create a password"
		hint="Use at least 15 characters"
	/>
	<Button>Create account</Button>
	<P>Need help? <A href="/form/input-password-create" target="_top">View our guidance</A></P>
</Form>
