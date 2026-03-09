<script>
import FieldInput from "./FieldInput.svelte";

const { children, ...props } = $props();
</script>

<FieldInput
  autocapitalize="off"
  autocomplete="url"
  autocorrect="off"
  spellcheck="false"
  {...props}
  type="url"
>
  {@render children?.()}
</FieldInput>
