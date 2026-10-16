<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"autoplay",
	"controls",
	"controlslist",
	"crossorigin",
	"disableremoteplayback",
	"loop",
	"muted",
	"preload",
	"src",
]);

const { children, ...props } = $props();
</script>

<!-- biome-ignore lint/a11y/useMediaCaption: track elements are provided by consumer via children -->
<audio
  controls
  preload="none"
  {...allowedAttributes(props, elementAttributes)}
>
  {@render children?.()}
</audio>
