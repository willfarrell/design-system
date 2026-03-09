<script>
import InputText from "./InputText.svelte";

const { children, ...props } = $props();
</script>

<InputText {...props} autocomplete="street-address">
  {@render children?.()}
</InputText>
