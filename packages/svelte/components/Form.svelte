<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-form-submit.js?worker&url";
import Form from "../elements/form.svelte";

const { children, is = "ds-form-submit", ...props } = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<Form {is} {...props}>
  {@render children?.()}
</Form>
