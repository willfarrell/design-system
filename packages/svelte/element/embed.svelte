<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
	  'height',
	  'src',
	  'type',
	  'width'
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<embed {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</embed>
