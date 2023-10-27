<script>
  import FieldInput from './FieldInput.svelte';
  
  export let autocomplete = 'email'
  export let autocapitalize = 'off'
  export let autocorrect = 'off'
  export let spellcheck = 'false'
</script>

<FieldInput
  {...$$props}
  type="email"
  {autocomplete}
  {autocapitalize}
  {autocorrect}
  {spellcheck} />
