<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
	  'span'
  ])
  
  let {
  ...props
  } = $props();
</script>
<col {...allowedAttributes(props, elementAttributes)} />
