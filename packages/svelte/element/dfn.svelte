<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([])
  
  let {
  children,
  ...props
  } = $props();
</script>
<dfn {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</dfn>
