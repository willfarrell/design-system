<script>
import Span from "./element/span.svelte";

const { id, error } = $props();
</script>

{#if true}
  {@const errors = error?.filter((v) => v.id === id)}
  {#if errors?.length}
    <Span id={id + "-error"} aria-live="polite">{errors[0].message}</Span>
  {/if}
{/if}
