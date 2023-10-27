<script>
  import { getContext } from "svelte";
  import Picture from "@components/element/Picture.svelte";
  import Image from "@components/element/Image.svelte";
  let { locale } = getContext("page");
  export let videoId, width, height, title;
  export let item;

  videoId ??= item.video.url.split("v=")[1];

  const baseUrl =
    import.meta.env.VITE_LOCALHOST === "TRUE"
      ? "https://dev.datastream.org"
      : "";
</script>

<div class="aspect-wrapper">
  <div
    is="youtube-ce"
    data-videoId={videoId}
    data-locale={locale}
    data-width={width}
    data-height={height}
    data-title={title}
    class="light-youtube-wrapper"
  >
    <button>
      <Image src="/img/icons.social.svg#youtube" width="64" height="64" />
    </button>
    <Picture src="{baseUrl}/img/yt/{videoId}.jpg" {width} {height} />
  </div>
</div>

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

  /* `:is()` Hack to prevent from being detected as unused */
  :is(iframe) {
    width: 100%;
    height: 100%;
  }
</style>
