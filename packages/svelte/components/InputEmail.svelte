<script>
import FieldInput from "./FieldInput.svelte";

const { children, ...props } = $props();
</script>

<FieldInput
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  autocomplete="email"
  {...props}
  type="email"
>
  {@render children?.()}
</FieldInput>
