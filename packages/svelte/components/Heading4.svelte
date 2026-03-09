<script>
import H4 from "../elements/h4.svelte";
import HeadingAnchor from "./HeadingAnchor.svelte";

const { children, id, ...props } = $props();
</script>

<H4 {...props} {id}>
  {@render children?.()}
  <HeadingAnchor {id} />
</H4>
