<script>
  import FieldInput from './FieldInput.svelte';
  let { ...props } = $props();
  let {
    autocapitalize = 'off', 
    autocorrect = 'off',  
    spellcheck = 'false'
  } = props
</script>

<FieldInput
  {...props}
  type="url"
  {autocapitalize}
  {autocorrect}
  {spellcheck}
  />
