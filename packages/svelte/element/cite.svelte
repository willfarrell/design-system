<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([])
  
  let {
  children,
  ...props
  } = $props();
</script>
<cite {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</cite>
