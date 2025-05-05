<script>
  import Span from './element/span.svelte'
  let { id, error } = $props();
  const errors = error?.filter((v) => v.id === id)
</script>

{#if errors?.length}
  <Span id={id + '-error'} aria-live="off">{errors[0].message}</Span>
{/if}
