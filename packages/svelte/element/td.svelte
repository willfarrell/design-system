<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'colspan',
    'headers',
    'rowspan'
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<td {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</td>