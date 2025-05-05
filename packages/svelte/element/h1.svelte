<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([])
  
  let {
  children,
  ...props
  } = $props();
</script>
<h1 {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</h1>
