<script>
  import FieldInput from './FieldInput.svelte';
  let { ...props } = $props();
</script>

<FieldInput
  {...props}
  type="date"
/>
