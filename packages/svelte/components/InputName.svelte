<script>
import InputText from "./InputText.svelte";

const { children, ...props } = $props();

// name, given-name, additional-name, family-name, nickname
</script>

<InputText autocomplete="name" {...props}>
  {@render children?.()}
</InputText>
