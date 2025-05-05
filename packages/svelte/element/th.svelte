<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'abbr',
    'colspan',
    'headers',
    'rowspan',
    'scope',
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<th {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</th>