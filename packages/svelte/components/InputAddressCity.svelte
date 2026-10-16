<script>
import InputText from "./InputText.svelte";

const { children, ...props } = $props();
</script>

<InputText autocomplete="address-level2" {...props}>
  {@render children?.()}
</InputText>
