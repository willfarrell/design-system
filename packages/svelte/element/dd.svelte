<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([])
  
  let {
  children,
  ...props
  } = $props();
</script>
<dd {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</dd>
