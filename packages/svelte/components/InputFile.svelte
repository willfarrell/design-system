<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-input-file.js?worker&url";
import FieldInput from "./FieldInput.svelte";

const { children, ...props } = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<FieldInput value={null} is="ds-input-file" {...props} type="file">
  {@render children?.()}
</FieldInput>
