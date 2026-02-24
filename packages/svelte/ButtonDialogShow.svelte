<script>
import Button from "@design-system/svelte/element/button.svelte";

const { children, commandfor, ...props } = $props();
</script>

<Button command="show-modal" {commandfor} {...props} }>
  {@render children?.()}
</Button>
