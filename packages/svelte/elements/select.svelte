<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"autocomplete",
	"disabled",
	"form",
	"multiple",
	"name",
	"required",
	"size",
]);

const { children, ...props } = $props();
</script>

<select {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</select>
