<script>
  import Optgroup from "./element/optgroup.svelte";
  const { children, ...props } = $props();
</script>

<Optgroup {...props}>
  {@render children?.()}
</Optgroup>
