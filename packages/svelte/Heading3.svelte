<script>
  import H3 from "./element/h3.svelte";
  import HeadingAnchor from "./HeadingAnchor.svelte";
  import A from "./element/a.svelte";
  const { children, ...props } = $props();
  const { id } = props;
</script>

<H3 {...props}>
  {@render children?.()}
  <HeadingAnchor {id} />
</H3>
