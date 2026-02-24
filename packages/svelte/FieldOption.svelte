<script>
import Option from "./element/option.svelte";

const { children, ...props } = $props();
</script>

<Option {...props}>
  {@render children?.()}
</Option>
