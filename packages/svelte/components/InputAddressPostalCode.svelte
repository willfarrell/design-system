<script>
import InputText from "./InputText.svelte";

const { children, ...props } = $props();
</script>

<InputText autocomplete="postal-code" {...props}>
  {@render children?.()}
</InputText>
