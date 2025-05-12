<script>
  import Img from "./element/img.svelte";
  import Picture from "./element/picture.svelte";
  const { ...props } = $props();
  const { src } = props;
  // TODO make src a URL
  const regExp = /\.svg([?#].*)?$/;
</script>

{#if regExp.test(src)}
  <Img {...props} />
{:else}
  <Picture>
    <Img {...props} />
  </Picture>
{/if}
