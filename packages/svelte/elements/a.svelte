<script>
import { page } from "$app/state";
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"download",
	"href",
	"hreflang",
	"ping",
	"referrerpolicy",
	"rel",
	"target",
	"type",
]);

const { children, ...rawProps } = $props();

const path = $derived.by(() => {
	try { return page.url.pathname + page.url.hash; } catch { return ''; }
});

const props = $derived.by(() => {
	const p = { ...rawProps };
	if (p.href?.substring(0, 8) === "https://") {
		// noreferrer excluded because `Referrer-Policy: noreferrer` should be in place
		p.rel ??= "noopener";
		p.target ??= "_blank";
	}
	if (p.href === path) {
		p["aria-current"] ??= "page";
	}
	return p;
});
</script>

<a {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
  {#if props.target === "_blank"}
    <span class="visually-hidden">(opens in new tab)</span>
  {/if}
</a>
