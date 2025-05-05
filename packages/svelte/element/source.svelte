<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'type',
    'src',
    'srcset',
    'sizes',
    'media',
    'height',
    'width',
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<source {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</source>