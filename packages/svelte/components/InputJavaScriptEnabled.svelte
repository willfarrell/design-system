<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-input-javascript-enabled.js?worker&url";
import InputHidden from "./InputHidden.svelte";

const {
	id = "javascript-enabled",
	is = `ds-input-${id}`,
	name = id,
	value = false,
} = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<InputHidden {is} {name} {value} />
