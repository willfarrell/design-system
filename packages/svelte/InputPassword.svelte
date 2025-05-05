<script>
  import FieldInput from "./FieldInput.svelte";
  let { ...props } = $props();
</script>

<FieldInput 
  {...props} 
  type="password" 
  autocomplete = 'current-password'
/>
