<script>
  import InputText from "./InputText.svelte";
  
  export let autocomplete = 'username'
</script>

<InputText {...$$props} {autocomplete} />
