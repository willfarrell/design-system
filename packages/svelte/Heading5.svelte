<script>
  import H5 from "./element/h5.svelte";
  import A from "./element/a.svelte";
  import HeadingAnchor from "./HeadingAnchor.svelte";
  const { children, ...props } = $props();
  const { id } = props;
</script>

<H5 {...props}>
  {@render children?.()}
  <HeadingAnchor {id} />
</H5>
