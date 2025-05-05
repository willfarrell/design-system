<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([])
  
  let {
  children,
  ...props
  } = $props();
</script>
<h4 {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</h4>