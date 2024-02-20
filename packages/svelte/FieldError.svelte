<script>
  
  export let id, error
  const errors = error?.filter((v) => v.id === id)
</script>

{#if errors?.length}
  <span id={id + '-error'}>{errors[0].message}</span>
{/if}
