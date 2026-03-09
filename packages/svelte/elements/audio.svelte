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
  autoplay="false"
  controls
  preload="none"
  {...allowedAttributes(props, elementAttributes)}
>
  {@render children?.()}
</audio>

<!-- <audio is="audio" controls {...props}>
  <source src="{baseUrl}/audio/{props.src}.mp3" type="audio/mp3" />
  <source src="{baseUrl}/audio/{props.src}.ogg" type="audio/ogg" />
</audio> -->
