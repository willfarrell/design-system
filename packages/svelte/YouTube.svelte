<script>
  import { getContext } from "svelte";
  import Div from "@design-system/svelte/element/div.svelte";
  import Picture from "@components/element/picture.svelte";
  import Img from "@components/element/img.svelte";
  let { locale } = getContext("page");
  export let videoId, width, height, title;
  export let item;

  videoId ??= item.video.url.split("v=")[1];

  const baseUrl =
    import.meta.env.VITE_LOCALHOST === "TRUE"
      ? "https://dev.datastream.org"
      : "";
</script>

<Div class="aspect-wrapper">
  <Div
    is="youtube-ce"
    data-videoId={videoId}
    data-locale={locale}
    data-width={width}
    data-height={height}
    data-title={title}
    class="light-youtube-wrapper"
  >
    <button>
      <Img src="/img/icons.social.svg#youtube" width="64" height="64" />
    </button>
    <Picture src="{baseUrl}/img/yt/{videoId}.jpg" {width} {height} />
  </Div>
</Div>

<style>
  .aspect-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 28.125%; /* 16:9 aspect ratio added here to eliminate black bars with previous method */
  }
  .light-youtube-wrapper {
    background-color: #000;
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    inset-block-end: 0;
    inset-inline-end: 0;
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
    inset-block-start: 50%;
    inset-inline-start: 50%;
    z-index: 1;
    filter: grayscale(100%) opacity(65%);
    transform: translate(-50%, -50%);
  }

  /* `:is()` Hack to prevent from being detected as unused */
  :is(iframe) {
    width: 100%;
    height: 100%;
  }
</style>
