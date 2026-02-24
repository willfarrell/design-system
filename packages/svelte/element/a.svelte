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

const { children, ...props } = $props();

const { pathname, hash } = page.url;

const path = pathname + hash;
// Prevents prerendering
// if (search?.substring(0, 2) !== "?/") {
//   path += search;
// }
if (props.href?.substring(0, 8) === "https://") {
    // noreferrer excluded because `Referrer-Policy: noreferrer` should be in place
	props.rel ??= "noopener";
	props.target ??= "_blank";
}
if (props.href === path) {
	props["aria-current"] ??= "page";
}
</script>

<a {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</a>
