<script>
import Button from "@design-system/svelte/element/button.svelte";

const { children, commandfor, ...props } = $props();
</script>

<Button command="close" {commandfor} {...props} }>
  {@render children?.()}
</Button>
