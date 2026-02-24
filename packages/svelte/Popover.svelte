<script>
import Div from "@design-system/svelte/element/div.svelte";

const { children, id, ...props } = $props();
</script>

<Div {id} popover {...props} }>
  {@render children?.()}
</Div>
