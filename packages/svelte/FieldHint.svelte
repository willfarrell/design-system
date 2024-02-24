<script>
  import Span from './element/span.svelte'
  export let id, hint;
</script>

{#if hint}
  <Span id="{id}-hint">{hint}</Span>
{/if}
