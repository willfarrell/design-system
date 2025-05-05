<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'disabled',
    'label',
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<optgroup {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</optgroup>