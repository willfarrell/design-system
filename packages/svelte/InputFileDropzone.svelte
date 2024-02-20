<script>
  export let id;
</script>

<div {id} is="ds-input-dropzone">
  <slot />
</div>

<style>
  div {
    border: var(--border-width) dashed currentColor;
    background-color: var(--color-l2);
  }
  :global(.highlight) {
    border-color: var(--color-primary);
  }
</style>
