<script>
  import InputText from "./InputText.svelte";
  
  export let autocomplete = 'name'
</script>

<InputText {...$$props} {autocomplete} />
