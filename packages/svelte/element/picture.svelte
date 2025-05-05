<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([])
  
  let {
  children,
  ...props
  } = $props();
</script>
<picture {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</picture>
<!--
  TODO move logic up
<script>
  import Img from "./Img.svelte";
  import dataAttributes from "../utils/dataAttributes.js";
  let { ...props } = $props();
  let {
    is,
    src,
    alt,
    sourceWidths = [320, 640, 1280, 1920],
    sourceFormats = ['avif', 'webp'],
    width,
    height,
    sizes = "100vw",
    loading,
    decoding
  } = props
  
  const srcset = (format) => {
    return sourceWidths.map(width => {
      let searchParams = src.searchParams
      searchParams.set('w', width)
      searchParams.set('fm', format)
      return `${src}${searchParams.toString()} ${width}`
    }).join(',')
  }
</script>

<picture
  {is}
  {...dataAttributes(props)}
>
  {#each sourceFormats as format}
    <source
      srcset="{srcset(format)}"
      type="image/{format}"
      {sizes}
    />
  {/each}
  <Img
    {src}
    {alt}
    {width}
    {height}
    {loading}
    {decoding}
    class={props.class}
  />
</picture>
-->