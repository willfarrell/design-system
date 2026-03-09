<script>
import Div from "../elements/div.svelte";

const { children, id, ...props } = $props();
</script>

<Div {id} popover="hint" {...props} >
  {@render children?.()}
</Div>
