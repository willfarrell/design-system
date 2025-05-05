<script>
  import FieldInput from './FieldInput.svelte';
  import Datalist from './element/datalist.svelte';
  let { children, ...props } = $props();
  let {
    is = 'ds-datalist', 
    id,
    autocapitalize = 'off',
    autocorrect = 'off',
    spellcheck = 'false'
  } = props
</script>

<FieldInput
  {...props}
  {is}
  list="{id}-datalist"
  {autocapitalize}
  {autocorrect}
  {spellcheck}>
  <Datalist id="{id}-datalist">
    {@render children?.()}
  </Datalist>
</FieldInput>
