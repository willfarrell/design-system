<script>
import A from "./element/a.svelte";
import H3 from "./element/h3.svelte";
import HeadingAnchor from "./HeadingAnchor.svelte";

const { children, ...props } = $props();
const { id } = props;
</script>

<H3 {...props}>
  {@render children?.()}
  <HeadingAnchor {id} />
</H3>
