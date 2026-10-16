<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-input-password.js?worker&url";
import FieldInput from "./FieldInput.svelte";

const { children, ...props } = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>
<FieldInput
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  is="ds-input-password"
  {...props}
  type="password"
>
  {@render children?.()}
</FieldInput>
