<script>
  import FieldInput from "./FieldInput.svelte";
  const { children, ...props } = $props();
</script>

<FieldInput {...props} type="password" autocomplete="current-password">
  {@render children?.()}
</FieldInput>
