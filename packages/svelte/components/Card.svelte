<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-card.js?worker&url";
import Article from "../elements/article.svelte";
import Div from "../elements/div.svelte";
import slugify from "../utils/slugify.js";

const { children, img, is = "ds-card", id, ...props } = $props();
const uid = $props.id();

const labelledby = $derived(`card-${id ? slugify(id) : uid}`);
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<Article {is} aria-labelledby={labelledby} {...props}>
  {#if children}
    <Div class="text">
      {@render children({ id: labelledby })}
    </Div>
  {/if}
  {#if img}
    <Div class="img">
      {@render img()}
    </Div>
  {/if}
</Article>
