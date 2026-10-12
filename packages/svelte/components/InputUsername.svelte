<script>
import InputText from "./InputText.svelte";

const { children, ...props } = $props();
</script>

<InputText autocomplete="username" {...props}>{@render children?.()}</InputText>
