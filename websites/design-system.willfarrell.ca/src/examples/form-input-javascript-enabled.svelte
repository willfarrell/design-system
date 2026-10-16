<script>
import InputJavaScriptEnabled from "@willfarrell-ds/svelte/components/InputJavaScriptEnabled.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-input-javascript-enabled.js?worker&url";
</script>

<svelte:head>
	<link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<Form method="POST">
	<InputJavaScriptEnabled />
	<Button>Continue</Button>
</Form>
