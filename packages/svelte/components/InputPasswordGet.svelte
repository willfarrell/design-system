<script>
import InputPassword from "./InputPassword.svelte";

const { children, ...props } = $props();
</script>

<InputPassword
  {...props}
  autocomplete="current-password">
  {@render children?.()}
</InputPassword>
