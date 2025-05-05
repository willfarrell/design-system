<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([])
  
  let {
  children,
  ...props
  } = $props();
</script>
<noscript {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</noscript>