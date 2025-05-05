<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'data',
    'form',
    'height',
    'name',
    'type',
    'width'
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<object {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</object>