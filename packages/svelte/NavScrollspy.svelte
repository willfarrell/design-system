<script>
  import Nav from "./element/nav.svelte";
  const { children, ...props } = $props();
  const { is = "ds-scrollspy" } = props;
</script>

<Nav {...props} {is}>
  {@render children?.()}
</Nav>
