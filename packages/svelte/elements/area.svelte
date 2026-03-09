<script>
import { page } from "$app/state";
import allowedAttributes from "../utils/attributes.js";

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

const { ...props } = $props();

const path = $derived.by(() => {
	try { return page.url.pathname + page.url.hash; } catch { return ''; }
});
// Prevents prerendering
// if (search?.substring(0, 2) !== "?/") {
//   path += search;
// }

if (props.href?.substring(0, 8) === "https://") {
	props.rel ??= "noreferrer";
	props.target ??= "_blank";
}
if (props.href === path) {
	props["aria-current"] ??= "page";
}
</script>

<!-- biome-ignore lint/a11y/useAltText: alt is passed via props by consumer -->
<area {...allowedAttributes(props, elementAttributes)} />
