<script>
import A from "@design-system/svelte/element/a.svelte";

let { children, ...props } = $props();
</script>

<A {...props} role="tag">
  {@render children?.()}
</A>
