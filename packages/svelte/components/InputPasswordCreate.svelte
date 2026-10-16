<script>
import InputPassword from "./InputPassword.svelte";

const { children, ...props } = $props();
</script>

<InputPassword
  autocomplete="new-password"
  {...props}
>
  {@render children?.()}
</InputPassword>
