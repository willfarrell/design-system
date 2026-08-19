<script>
import InputText from "./InputText.svelte";

const { children, ...props } = $props();
</script>

<InputText {...props} autocomplete="organization">{@render children?.()}</InputText>
