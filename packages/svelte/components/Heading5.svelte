<script>
import H5 from "../elements/h5.svelte";
import HeadingAnchor from "./HeadingAnchor.svelte";

const { children, id, ...props } = $props();
</script>

<H5 {...props} {id}>
  {@render children?.()}
  <HeadingAnchor {id} />
</H5>
