<script>
  import FieldInput from "./FieldInput.svelte";
  
  export let autocapitalize = 'off', autocorrect = 'off', spellcheck = 'false'
  export let autocomplete = 'new-password'
</script>

<FieldInput {...$$props} type="password" {autocomplete} {autocapitalize} {autocorrect} {spellcheck} />
