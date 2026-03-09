<script>
import { setContext } from "svelte";
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"accept",
	"accept-charset",
	"autocapitalize",
	"autocomplete",
	"name",
	"rel",
	"action",
	"enctype",
	"method",
	"novalidate",
	"target",
]);

const { errors, children, ...rawProps } = $props();

const props = $derived.by(() => {
	const p = { ...rawProps };
	// TODO really needed? test
	if (p?.action && p.action?.substring(0, 1) !== "/") {
		p.action = `?/${p.action ?? ""}`;
	}
	return p;
});

setContext("form", {
	get errors() {
		return errors;
	},
});
</script>

<form method="POST" novalidate {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</form>
