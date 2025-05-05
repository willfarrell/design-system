<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([])
  
  let {
	...props
  } = $props();
</script>
<br {...allowedAttributes(props, elementAttributes)} />
