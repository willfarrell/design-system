<script>
import { setContext } from "svelte";
import Label from "../elements/label.svelte";

const { children, id, label, ...props } = $props();
setContext("label", true);
</script>

{#if label}
  <Label for={id} {...props}>
    {#if children}{@render children(label.toString())}{:else}{@html label}{/if}
  </Label>
{/if}
