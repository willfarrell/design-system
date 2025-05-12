<script>
  import InputText from "./InputText.svelte";
  const { children, ...props } = $props();
</script>

<InputText {...props} autocomplete="username">{@render children?.()}</InputText>
