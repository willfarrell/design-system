<script>
// import Picture from '@design-system/elements/picture.svelte'
import Img from "@design-system/elements/img.svelte";
import { getContext } from "svelte";
import Button from "../elements/button.svelte";
import Div from "../elements/div.svelte";
import Span from "../elements/span.svelte";

const { videoId: videoIdProp, title, width, height, item, ...props } = $props();
const { locale } = getContext("page");
let videoId = $derived(videoIdProp ?? item.video.url.split("v=")[1]);

const baseUrl =
	import.meta.env.VITE_LOCALHOST === "TRUE" ? "https://dev.datastream.org" : "";
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
      <Span class="visually-hidden">Play {title}</Span>
      <Img src="/img/icons.media.svg#play" width="64" height="64" alt="" />
    </Button>
    <!--<Picture src="{baseUrl}/img/yt/{videoId}.jpg" {width} {height} />-->
  </Div>
</Div>

<style>
  .aspect-wrapper {
        inline-size: 100%;
        block-size: 100%;
        position: relative;
        padding: 28.125%; /* 16:9 aspect ratio added here to eliminate black bars with previous method */
      }
      .light-vimeo-wrapper {
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        inset-inline-end: 0;
        display: block;
        contain: content;
        max-inline-size: 100%;
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

      :global(iframe) {
        inline-size: 100%;
        block-size: 100%;
      }
</style>
