<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'open'
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<dialog {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</dialog>
