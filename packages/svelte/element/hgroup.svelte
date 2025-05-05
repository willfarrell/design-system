<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([])
  
  let {
  children,
  ...props
  } = $props();
</script>
<hgroup role="group" aria-roledescription="heading group" {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</hgroup>