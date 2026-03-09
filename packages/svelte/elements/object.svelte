<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"data",
	"form",
	"height",
	"name",
	"type",
	"width",
]);

const { children, ...props } = $props();
</script>

<!-- biome-ignore lint/a11y/useAltText: alt text is provided by consumer via props -->
<object {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</object>
