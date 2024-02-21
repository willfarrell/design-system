<script>
  import Img from "./element/img.svelte";
  import Picture from "./element/picture.svelte";
  export let src;
  // TODO make src a URL
  const regExp = new RegExp('\.svg([?#].*)?$', 'i')
</script>

{#if regExp.test(src)}
  <Img {...$$props} />
{:else}
  <Picture {...$$props} />
{/if}
