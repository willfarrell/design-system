<script>
import { getContext, setContext } from "svelte";
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["disabled", "form", "name"]);

const { children, ...props } = $props();

// props.name ??= props.id; // TODO causes issue
if (props?.hint) {
	props["aria-describedby"] ??= `${props.id}-hint`;
}
</script>

<fieldset {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</fieldset>
