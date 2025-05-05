<script>
  import allowedAttributes from '../utils/attributes.js'
  import { page } from '$app/stores'
  
  const elementAttributes = new Set([
    'download', 
    'href', 
    'hreflang',
    'ping',
    'referrerpolicy',
    'rel',
    'target',
    'type',
  ])
  
  let {
    children,
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

<a {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</a>
