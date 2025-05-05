<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set(['cite'])
  
  let {
	children,
	...props
  } = $props();
</script>
<blockquote {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</blockquote>
