<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-input-webauthn-create.js?worker&url";
import InputHidden from "./InputHidden.svelte";

const { is = "ds-input-webauthn-create", ...props } = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<InputHidden {is} {...props} />
