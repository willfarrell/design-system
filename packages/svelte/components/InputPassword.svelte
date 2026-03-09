<script>
import FieldInput from "./FieldInput.svelte";

const { children, ...props } = $props();
</script>
<!-- TODO caps lock indicator - use password component -->
<!-- TODO show/hide - use password component -->
<FieldInput
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  {...props}
  type="password"
>
  {@render children?.()}
</FieldInput>
