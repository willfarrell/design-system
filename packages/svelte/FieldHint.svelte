<script>
  import Span from './element/span.svelte'
  let { id, hint } = $props();
</script>

{#if hint}
  <Span id="{id}-hint">{hint}</Span>
{/if}
