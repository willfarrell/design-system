<script>
  import Optgroup from "./element/optgroup.svelte";
  let { children, ...props } = $props();
</script>

<Optgroup {...props}>
    {@render children?.()}
</Optgroup>
