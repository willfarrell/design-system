<script>
import Optgroup from "../elements/optgroup.svelte";

const { children, ...props } = $props();
</script>

<Optgroup {...props}>
  {@render children?.()}
</Optgroup>
