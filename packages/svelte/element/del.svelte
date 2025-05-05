<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'cite',
    'datatime'
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<del {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</del>
