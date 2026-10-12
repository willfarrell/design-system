<script>
import InputText from "./InputText.svelte";

const { children, ...props } = $props();
</script>

<InputText autocomplete="street-address" {...props}>
  {@render children?.()}
</InputText>
