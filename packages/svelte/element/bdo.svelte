<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set(['dir'])
  
  let {
    children,
    ...props
  } = $props();
</script>
<bdo {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</bdo>
