<script>
import Span from "../elements/span.svelte";

const { id, hint } = $props();
</script>

{#if hint}
  <Span id="{id}-hint">{@html hint}</Span>
{/if}
