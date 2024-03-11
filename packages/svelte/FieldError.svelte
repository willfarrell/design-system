<script>
  import Span from './element/span.svelte'
  
  export let id, error
  const errors = error?.filter((v) => v.id === id)
</script>

{#if errors?.length}
  <Span id={id + '-error'} aria-live="off">{errors[0].message}</Span>
{/if}
