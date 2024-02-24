<script>
  import Div from './element/div.svelte';
  export let id;
</script>

<Div {id} is="ds-input-dropzone">
  <slot />
</Div>

<style>
  :global(div) {
    border: var(--border-width) dashed currentColor;
    background-color: var(--color-l2);
  }
  :global(.highlight) {
    border-color: var(--color-primary);
  }
</style>
