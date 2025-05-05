<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'disabled',
    'label',
    'selected',
    'value'
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<option {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</option>