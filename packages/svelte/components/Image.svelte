<script>
import Img from "../elements/img.svelte";
import Picture from "../elements/picture.svelte";

const { src, lqip, ...rest } = $props();
// TODO make src a URL
const regExp = /\.svg([?#].*)?$/;

const props = $derived({
	...rest,
	"data-lqip": /^-?\d+$/.test(lqip) ? lqip : undefined,
});
</script>

{#if regExp.test(src)}
  <Img {src} {...props} />
{:else}
  <Picture>
    <Img {src} {...props} />
  </Picture>
{/if}
