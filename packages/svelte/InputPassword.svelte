<script>
  import FieldInput from "./FieldInput.svelte";
  
  export let autocomplete = 'current-password'
</script>

<FieldInput {...$$props} type="password" {autocomplete} />
