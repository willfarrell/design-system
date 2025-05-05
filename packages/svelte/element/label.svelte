<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'for',
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<label {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</label>