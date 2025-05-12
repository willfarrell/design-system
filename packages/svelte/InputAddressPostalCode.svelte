<script>
  import InputText from "./InputText.svelte";
  const { children, ...props } = $props();
</script>

<InputText {...props} autocomplete="postal-code">
  {@render children?.()}
</InputText>
