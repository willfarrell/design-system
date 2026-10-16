<script>
import Legend from "../elements/legend.svelte";

const { children, legend, ...props } = $props();
</script>

{#if legend}
  <Legend {...props}>
    {#if children}{@render children(legend)}{:else}{legend}{/if}
  </Legend>
{/if}
