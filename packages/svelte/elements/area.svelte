<script>
import { page } from "$app/state";
import allowedAttributes from "../utils/attributes.js";
import safeHref from "../utils/safeHref.js";

const elementAttributes = new Set([
	"alt",
	"coords",
	"download",
	"href",
	"ping",
	"referrerpolicy",
	"rel",
	"shape",
	"target",
]);

const { ...rawProps } = $props();
const path = $derived.by(() => {
	try {
		return page.url.pathname + page.url.hash;
	} catch {
		return "";
	}
});

const props = $derived.by(() => {
	const p = { ...rawProps, href: safeHref(rawProps.href) };
	if (p.href?.substring(0, 8) === "https://") {
		p.rel ??= "noreferrer";
		p.target ??= "_blank";
	}
	if (p.href === path) {
		p["aria-current"] ??= "page";
	}
	return p;
});
</script>

<!-- biome-ignore lint/a11y/useAltText: alt is passed via props by consumer -->
<area {...allowedAttributes(props, elementAttributes)} />
