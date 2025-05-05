<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'autoplay',
    'controls',
    'controlslist',
    'crossorigin',
    'disablepictureinpicture',
    'height',
    'loop',
    'muted',
    'playsinline',
    'poster',
    'preload',
    'src',
    'width'
  ])
  
  let {
  children,
  ...props
  } = $props();
</script>
<video autoplay="false" controls preload="none" {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</video>
<!--
  TODO move up a level
  <script>
  import { getContext } from 'svelte'
  import i18n from '@utils/i18n.js'
  let { locale } = getContext('page')

  let { src } = $props();

  const baseUrl =
    import.meta.env.VITE_LOCALHOST === 'TRUE'
      ? 'https://dev.datastream.org'
      : ''

  const sizes = [240, 360, 480, 720, 1080, 1440, 2160, 4320]
  const locales = ['en-CA', 'fr-CA']
  const t = i18n(locale)
</script>

<video is="video" controls playsinline poster="" width="16" height="9">
  {#each sizes as size}
    <source src="{baseUrl}/video/{src}-{size}p.mp4" type="video/mp4" {size} />
    <source src="{baseUrl}/video/{src}-{size}p.webm" type="video/webm" {size} />
  {/each}
  {#each locales as locale}
    <track
      kind="captions"
      src="{baseUrl}/video/{src}-{locale}.vtt"
      label={t(`locale-${locale}`)}
      srclang={locale}
    />
  {/each}
</video>
-->