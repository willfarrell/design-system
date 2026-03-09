<script>
import Button from "../elements/button.svelte";

const { children, commandfor, ...props } = $props();
</script>

<Button command="close" {commandfor} {...props} >
  {@render children?.()}
</Button>
