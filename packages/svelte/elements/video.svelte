<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"autoplay",
	"controls",
	"controlslist",
	"crossorigin",
	"disablepictureinpicture",
	"height",
	"loop",
	"muted",
	"playsinline",
	"poster",
	"preload",
	"src",
	"width",
]);

const { children, ...props } = $props();
</script>

<!-- biome-ignore lint/a11y/useMediaCaption: track elements are provided by consumer via children -->
<video
  controls
  preload="none"
  {...allowedAttributes(props, elementAttributes)}
>
  {@render children?.()}
</video>
