<script>
import InputText from "./InputText.svelte";

const { children, ...props } = $props();
</script>

<InputText autocomplete="organization" {...props}>{@render children?.()}</InputText>
