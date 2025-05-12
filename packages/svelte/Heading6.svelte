<script>
  import H6 from "./element/h6.svelte";
  import A from "./element/a.svelte";
  import HeadingAnchor from "./HeadingAnchor.svelte";
  const { children, ...props } = $props();
  const { id } = props;
</script>

<H6 {...props}>
  {@render children?.()}
  <HeadingAnchor {id} />
</H6>
