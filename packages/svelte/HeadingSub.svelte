<script>
import P from "./element/p.svelte";

const { children, ...props } = $props();
</script>

<P {...props} aria-roledescription="subtitle">
  {@render children?.()}
</P>
