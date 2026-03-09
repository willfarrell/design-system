<script>
import Div from "../elements/div.svelte";

const { children, id, ...props } = $props();
</script>

<Div {id} popover="auto" {...props}>
  {@render children?.()}
</Div>
