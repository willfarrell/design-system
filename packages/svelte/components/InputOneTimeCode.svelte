<script>
import InputNumber from "./InputNumber.svelte";

const { children, ...props } = $props();
</script>

<InputNumber pattern="^[0-9]*$" autocomplete="one-time-code" {...props}>
  {@render children?.()}
</InputNumber>
