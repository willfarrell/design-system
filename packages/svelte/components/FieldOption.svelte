<script>
import Option from "../elements/option.svelte";

const { children, ...props } = $props();
</script>

<Option {...props}>
  {@render children?.()}
</Option>
