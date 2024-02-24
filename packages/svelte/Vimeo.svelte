<script>
  import { getContext } from "svelte";
  import Div from '@design-system/svelte/element/div.svelte';
  // import Picture from '@components/element/picture.svelte'
  import Img from "@components/element/img.svelte";
  import Button from '@design-system/svelte/element/button.svelte';
  let { locale } = getContext("page");
  export let videoId, title, width, height;
  export let item;

  videoId ??= item.video.url.split("v=")[1];

  videoId = 849459986;

  const baseUrl =
    import.meta.env.VITE_LOCALHOST === "TRUE"
      ? "https://dev.datastream.org"
      : "";
</script>

<Div class="aspect-wrapper">
  <Div
    is="vimeo-ce"
    data-videoId={videoId}
    data-locale={locale}
    data-width={width}
    data-height={height}
    data-title={title}
    class="light-vimeo-wrapper"
  >
    <Button>
      <Img src="/img/icons.media.svg#play" width="64" height="64" />
    </Button>
    <!--<Picture src="{baseUrl}/img/yt/{videoId}.jpg" {width} {height} />-->
  </Div>
</Div>

<style>
  .aspect-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 28.125%; /* 16:9 aspect ratio added here to eliminate black bars with previous method */
  }
  .light-vimeo-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: block;
    contain: content;
    max-width: 100%;
    border-radius: var(--image-radius);
  }

  div:has(button) {
    cursor: pointer;
  }

  button {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    filter: grayscale(100%) opacity(65%);
    transform: translate(-50%, -50%);
  }

  :global(iframe) {
    width: 100%;
    height: 100%;
  }
</style>
