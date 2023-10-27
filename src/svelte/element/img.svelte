<script>
  export let src,
    alt,
    loading,
    decoding,
    width,
    height;
</script>

<img
  class={$$props.class}
  {src}
  alt={alt ?? ""}
  loading={loading ?? "lazy"}
  decoding={decoding ?? "async"}
  width={width ?? 1}
  height={height ?? 1}
/>
