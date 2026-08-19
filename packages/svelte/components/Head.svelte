<script>
let { children } = $props();
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />



  <!-- defer by default -->
  <link rel="stylesheet" media="print" href="/css/print.css?v=" />

  <link rel="icon" href="/favicon.svg" />
  <link rel="mask-icon" href="/favicon.svg" color="#175c89" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <link rel="manifest" href="/.well-known/manifest.webmanifest" crossorigin="use-credentials" />

  <!-- <link rel="alternate" type="application/rss+xml" title="RSS" href="/{meta.lang ? meta.lang+'/' : ''}rss.xml">-->
  <!-- <link rel="alternate" type="application/atom+xml" title="Atom" href="/{meta.lang}/atom.xml"> TODO-->
  <!-- <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml"/>-->

  {@render children?.()}
</svelte:head>
