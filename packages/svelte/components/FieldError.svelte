<script>
import Span from "../elements/span.svelte";

const { id, error } = $props();
const errors = $derived(error?.filter((v) => v.id === id) ?? []);
</script>

{#if errors.length}
  <Span id={`${id}-error`} aria-live="polite">
    {#each errors as e, i}{#if i}<br />{/if}{e.message}{/each}
  </Span>
{/if}
