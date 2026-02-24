<script>
import FieldInput from "./FieldInput.svelte";

const { children, ...props } = $props();
</script>

<FieldInput value={null} is="ds-input-file" {...props} type="file">
  {@render children?.()}
</FieldInput>
