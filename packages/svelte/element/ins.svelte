<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'cite',
    'datetime'
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<ins {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</ins>