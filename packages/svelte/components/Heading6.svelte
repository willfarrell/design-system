<script>
import H6 from "../elements/h6.svelte";
import HeadingAnchor from "./HeadingAnchor.svelte";

const { children, id, ...props } = $props();
</script>

<H6 {...props} {id}>
  {@render children?.()}
  <HeadingAnchor {id} />
</H6>
