<script>
  import InputText from "./InputText.svelte";
  
  export let autocomplete = 'street-address'
</script>

<InputText {...$$props} {autocomplete} />
