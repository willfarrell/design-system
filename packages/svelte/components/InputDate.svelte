<script>
import FieldInput from "./FieldInput.svelte";

const { children, ...props } = $props();
</script>

<FieldInput {...props} type="date">
  {@render children?.()}
</FieldInput>
