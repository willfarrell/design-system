<script>
  export let id, hint;
</script>

{#if hint}
  <span id="{id}-hint">{hint}</span>
{/if}
