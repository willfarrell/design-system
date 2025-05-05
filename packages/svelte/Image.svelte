<script>
  import Img from "./element/img.svelte";
  import Picture from "./element/picture.svelte";
  let { ...props } = $props();
  let { src } = props;
  // TODO make src a URL
  const regExp = new RegExp("\.svg([?#].*)?$", "i");
</script>

{#if regExp.test(src)}
  <Img {...props} />
{:else}
  <Picture>
    <Img {...props} />
  </Picture>
{/if}
