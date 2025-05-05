<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([])
  
  let {
  children,
  ...props
  } = $props();
</script>
<figure {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</figure>
