<script>
  import FieldInput from './FieldInput.svelte';
  import Datalist from './element/datalist.svelte';
  
  export let id
  export let autocapitalize = 'off'
  export let autocorrect = 'off'
  export let spellcheck = 'false'
</script>

<FieldInput
  {...$$props}
  is="ds-datalist"
  list="{id}-datalist"
  {autocapitalize}
  {autocorrect}
  {spellcheck}>
  <Datalist id="{id}-datalist">
    <slot />
  </Datalist>
</FieldInput>
