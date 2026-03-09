<script>
import H3 from "../elements/h3.svelte";
import HeadingAnchor from "./HeadingAnchor.svelte";

const { children, id, ...props } = $props();
</script>

<H3 {...props} {id}>
  {@render children?.()}
  <HeadingAnchor {id} />
</H3>
