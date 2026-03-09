<script>
import FieldInput from "./FieldInput.svelte";

const { children, ...props } = $props();
</script>

<FieldInput
  dir="auto"
  autocapitalize="off"
  autocomplete="off"
  autocorrect="off"
  spellcheck="false"
  enterkeyhint="search"
  {...props}
  type="search"
>
  {@render children?.()}
</FieldInput>
