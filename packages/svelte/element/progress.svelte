<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
	  'max',
	  'value',
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<progress {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</progress>