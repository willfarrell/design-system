<script>
import { getContext, setContext } from "svelte";
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["disabled", "form", "name"]);

const { children, ...rawProps } = $props();

const props = $derived.by(() => {
	const p = { ...rawProps };
	// p.name ??= p.id; // TODO causes issue
	if (p?.hint) {
		p["aria-describedby"] ??= `${p.id}-hint`;
	}
	return p;
});
</script>

<fieldset {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</fieldset>
