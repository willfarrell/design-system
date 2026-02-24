<script>
// import webComponentUrl from "../component/ds-card.js?url"; // requires polyfill first
import Div from "@design-system/svelte/element/div.svelte";
import Li from "@design-system/svelte/element/li.svelte";

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

<!-- <svelte:head>
  <script src={webComponentUrl} type="module"></script>
</svelte:head> -->

<!-- src: https://inclusive-components.design/cards/ -->
{#if true}
  {@const labelledby = `card-${slugify(id)}`}
  <Li {is} {...props}>
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
  </Li>
{/if}
