<script>
  import Input from "./element/input.svelte";
  let { ...props } = $props();
</script>

<Input {...props} type="hidden" />
