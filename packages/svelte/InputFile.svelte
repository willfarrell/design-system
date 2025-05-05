<script>
  import FieldInput from './FieldInput.svelte'
  let { ...props } = $props();
  let {
    is = 'ds-input-file',
    value = null
  } = props
</script>

<FieldInput 
  {...props} 
  type="file"
  {is}
  {value} 
/>
