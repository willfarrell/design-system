<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'span'
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<colgroup {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</colgroup>
