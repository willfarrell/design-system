<script>
import H2 from "../elements/h2.svelte";
import HeadingAnchor from "./HeadingAnchor.svelte";

const { children, id, ...props } = $props();
</script>

<H2 {...props} {id}>
  {@render children?.()}
  <HeadingAnchor {id} />
</H2>
