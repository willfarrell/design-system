<script>
import InputSelect from "./InputSelect.svelte";

const { children, ...props } = $props();
</script>

<InputSelect
  autocapitalize="off"
  autocomplete="country"
  autocorrect="off"
  spellcheck="false"
  {...props}
>
  {@render children?.()}
</InputSelect>
