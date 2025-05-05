<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
	  'height',
	  'width'
  ])
  
  let {
	children,
	...props
  } = $props();
</script>
<canvas {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</canvas>
