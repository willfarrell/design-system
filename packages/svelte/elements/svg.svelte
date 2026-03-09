<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, alt, ...props } = $props();
</script>

<!-- biome-ignore lint/a11y/noSvgWithoutTitle: title is provided by consumer via children -->
<svg {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</svg>
