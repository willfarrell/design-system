<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
	  'autofocus',
	  'disabled',
	  'form',
	  'formaction',
	  'formenctype',
	  'formmethod',
	  'formnovalidate',
	  'formtarget',
	  'name',
	  'popovertarget',
	  'popovertargetaction',
	  'type',
	  'value'
  ])
  
  let {
	children,
	...props
  } = $props();
</script>
<button type="button" {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</button>
