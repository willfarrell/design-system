<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-input-webauthn-get.js?worker&url";
import InputHidden from "./InputHidden.svelte";

const { is = "ds-input-webauthn-get", ...props } = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<InputHidden {is} {...props} autocomplete="webauthn" />
