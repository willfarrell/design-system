<script>
import P from "../elements/p.svelte";

const { children, ...props } = $props();
</script>

<P {...props} aria-roledescription="subtitle">
  {@render children?.()}
</P>
