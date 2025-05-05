<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
	  'value',
	  'min',
	  'max',
	  'low',
	  'high',
	  'optimum',
	  'form'
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<meter {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</meter>