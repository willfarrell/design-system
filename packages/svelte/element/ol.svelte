<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'reversed',
    'start',
    'type',
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<ol {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</ol>