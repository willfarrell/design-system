<script>
  import Img from "./Img.svelte";
  import dataAttributes from "../utils/dataAttributes.js";
  export let is,
    src,
    alt,
    sourceWidths = [320, 640, 1280, 1920],
    sourceFormats = ['avif', 'webp'],
    width,
    height,
    sizes = "100vw",
    loading,
    decoding;
  
  const srcset = (format) => {
    return sourceWidths.map(width => {
      let searchParams = src.searchParams
      searchParams.set('w', width)
      searchParams.set('fm', format)
      return `${src}${searchParams.toString()} ${width}`
    }).join(',')
  }
</script>

<picture {is} {...dataAttributes($$props)}>
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
    class={$$props.class}
  />
</picture>
