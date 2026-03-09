<script>
import Div from "../elements/div.svelte";

const { children } = $props();
</script>

<Div>
  {@render children?.()}
</Div>

<style>
  :global(body > div) {
    margin-inline: var(--padding-page-inline);
    padding-block: 1em;
  }
</style>
