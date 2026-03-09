<script>
import A from "../elements/a.svelte";

let { children, rel = "tag", ...props } = $props();
</script>

<A {rel} {...props} >
  {@render children?.()}
</A>
