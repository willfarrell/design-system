<script>
import InputPassword from "./InputPassword.svelte";

const { children, ...props } = $props();
</script>

<InputPassword
  autocomplete="current-password"
  {...props}
>
  {@render children?.()}
</InputPassword>
