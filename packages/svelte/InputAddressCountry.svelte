<script>
  import InputSelect from "./InputSelect.svelte";
  let { children, ...props } = $props();
  let {
    autocomplete = 'country',
    autocapitalize = 'off',
    autocorrect = 'off',
    spellcheck = 'false'
  } = props
</script>

<InputSelect
  {...props} 
  {autocomplete} 
  {autocapitalize} 
  {autocorrect} 
  {spellcheck}
  >
  {@render children?.()}
</InputSelect>
