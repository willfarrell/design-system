<script>
  import Option from "./element/option.svelte";
  let { children, ...props } = $props();
</script>

<Option {...props}>
    {@render children?.()}
</Option>
