<script>
  import InputText from "./InputText.svelte";
  const { ...props } = $props();

  // name, given-name, additional-name, family-name, nickname
</script>

<InputText autocomplete="nickname" {...props}>
  {@render children?.()}
</InputText>
