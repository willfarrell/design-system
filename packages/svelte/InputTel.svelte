<script>
  import FieldInput from './FieldInput.svelte';
  
  export let autocomplete = 'tel'
</script>

<FieldInput
  {...$$props}
  type="tel"
  {autocomplete} />
