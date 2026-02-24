<script>
import Div from "@design-system/svelte/element/div.svelte";

const { children, id, ...props } = $props();
</script>

<Div {id} popover="hint" {...props} }>
  {@render children?.()}
</Div>
