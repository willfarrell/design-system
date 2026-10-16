<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"color",
	"fill",
	"fill-opacity",
	"fill-rule",
	"height",
	"opacity",
	"overflow",
	"preserveAspectRatio",
	"stroke",
	"stroke-dasharray",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-opacity",
	"stroke-width",
	"transform",
	"viewBox",
	"width",
	"x",
	"xmlns",
	"y",
]);

const { children, ...props } = $props();
</script>

<!-- biome-ignore lint/a11y/noSvgWithoutTitle: title is provided by consumer via children -->
<svg {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</svg>
