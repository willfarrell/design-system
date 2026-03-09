<script>
import InputPassword from "./InputPassword.svelte";

const { children, ...props } = $props();
</script>

<InputPassword
  {...props}
  autocomplete="new-password"
>
  {@render children?.()}
</InputPassword>
