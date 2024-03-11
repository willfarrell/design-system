<script>
  import Div from './element/div.svelte';
  export let id;
</script>

<Div {id} is="ds-input-dropzone">
  <slot />
</Div>