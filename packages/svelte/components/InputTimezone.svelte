<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-input-timezone.js?worker&url";
import InputHidden from "./InputHidden.svelte";

// Empty on the server (SSR only ever knows UTC); ds-input-timezone fills it on
// connect. No JS means an empty post, which callers must treat as "unchanged".
const { id = "timezone", name = id, value = "" } = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<InputHidden is="ds-input-timezone" {id} {name} {value} />
