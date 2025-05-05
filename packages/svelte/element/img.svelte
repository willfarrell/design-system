<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'alt',
    'crossorigin',
    'decoding',
    'elementtiming',
    'fetchpriority',
    'height',
    'ismap',
    'loading',
    'referrerpolicy',
    'sizes',
    'src',
    'srcset',
    'width',
    'usemap',
  ])
  
  let {
    ...props
  } = $props();
</script>
<img alt="" decoding="async" fetchpriority="low" loading="lazy" height="1" width="1" {...allowedAttributes(props, elementAttributes)}/>