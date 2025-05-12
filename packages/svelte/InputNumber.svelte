<script>
  import InputText from "./InputText.svelte";
  const { children, ...props } = $props();
</script>

<InputText {...props} inputmode="numeric">
  {@render children?.()}
</InputText>
