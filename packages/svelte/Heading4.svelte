<script>
  import H4 from "./element/h4.svelte";
  import A from "./element/a.svelte";
  import HeadingAnchor from "./HeadingAnchor.svelte";
  const { children, ...props } = $props();
  const { id } = props;
</script>

<H4 {...props}>
  {@render children?.()}
  <HeadingAnchor {id} />
</H4>
