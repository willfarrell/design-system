<script>
import Img from "../elements/img.svelte";
import Picture from "../elements/picture.svelte";

const { src, ...props } = $props();
// TODO make src a URL
const regExp = /\.svg([?#].*)?$/;
</script>

{#if regExp.test(src)}
  <Img {src} {...props} />
{:else}
  <Picture>
    <Img {src} {...props} />
  </Picture>
{/if}
