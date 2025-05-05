<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
	  'name'
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<map {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</map>