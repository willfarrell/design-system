<script>
  import Div from './element/div.svelte';
  export let id;
</script>

<Div {id} is="ds-input-dropzone">
  <slot />
</Div>

<style>
  :global([is="ds-input-dropzone"]) {
    border: var(--border-width) dashed currentColor;
    background-color: var(--color-l2);
  }
  :global([is="ds-input-dropzone"].highlight) {
    border-color: var(--color-main);
  }
</style>
