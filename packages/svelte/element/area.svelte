<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
	  'alt',
	  'coords',
	  'download',
	  'href',
	  'ping',
	  'referrerpolicy',
	  'rel',
	  'shape',
	  'target',
  ])
  
  let {
	...props
  } = $props();
  
  const { pathname, hash } = $page.url
	
	const path = pathname+hash;
	// Prevents prerendering
	// if (search?.substring(0, 2) !== "?/") {
	//   path += search;
	// }
	
	if (props.href?.substring(0, 8) === "https://") {
		props.rel ??= "noreferrer"
		props.target ??= "_blank"
	}
	if (props.href === path) {
		props['aria-current'] ??= "page"
	}
	
</script>
<area {...allowedAttributes(props, elementAttributes)} />
