<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-card.js?url&worker";
import Article from "../elements/article.svelte";
import Div from "../elements/div.svelte";

const { children, img, is = "ds-card", id, ...props } = $props();

const slugify = (id) => {
	if (!id) {
		return Math.random().toString(36).slice(2);
	}
	return id
		.toLocaleLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "")
		.replace(/--+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
};
</script>

<svelte:head>
  <!-- <script src={webComponentUrl} type="module"></script> -->
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<!-- src: https://inclusive-components.design/cards/ -->
{#if true}
  {@const labelledby = `card-${slugify(id)}`}
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
{/if}
