<script>
  import InputText from "./InputText.svelte";
  const { children, ...props } = $props();
</script>

<InputText {...props} autocomplete="address-level2">
  {@render children?.()}
</InputText>
