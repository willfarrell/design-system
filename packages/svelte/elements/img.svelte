<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"crossorigin",
	"decoding",
	"elementtiming",
	"fetchpriority",
	"height",
	"ismap",
	"loading",
	"referrerpolicy",
	"sizes",
	"src",
	"srcset",
	"width",
	"usemap",
]);

const { alt, ...props } = $props();
</script>

<img
  {alt}
  decoding="async"
  fetchpriority="low"
  loading="lazy"
  {...allowedAttributes(props, elementAttributes)}
/>
