<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([])
  
  let {
  children,
  ...props
  } = $props();
</script>
<h6 {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</h6>