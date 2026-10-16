<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-input-timezone.js?worker&url";
import InputHidden from "./InputHidden.svelte";

const { id = "timezone", name = id, value = "" } = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<InputHidden is="ds-input-timezone" {id} {name} {value} />
