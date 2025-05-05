<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([])
  
  let {
  children,
  ...props
  } = $props();
</script>
<dl {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</dl>
