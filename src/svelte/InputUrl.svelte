<script>
  import FieldInput from './FieldInput.svelte';
  
  export let autocapitalize = 'off', autocorrect = 'off',  spellcheck = 'false'
</script>

<FieldInput
  {...$$props}
  type="url"
  {autocapitalize}
  {autocorrect}
  {spellcheck}/>
