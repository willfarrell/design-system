<script>
  import FieldInput from "./FieldInput.svelte";
  const { children, ...props } = $props();
</script>

<FieldInput autocomplete="tel" {...props} type="tel">
  {@render children?.()}
</FieldInput>
