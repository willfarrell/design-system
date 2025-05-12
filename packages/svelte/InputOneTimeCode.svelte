<script>
  import InputNumber from "./InputNumber.svelte";
  const { children, ...props } = $props();
</script>

<InputNumber pattern="^[0-9]*$" {...props} autocomplete="one-time-code">
  {@render children?.()}
</InputNumber>
