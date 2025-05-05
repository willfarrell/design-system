<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'title',
  ])
  
  let {
    children,
    ...props
  } = $props();
</script>
<abbr {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</abbr>
