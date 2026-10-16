<script>
import Svg from "../elements/svg.svelte";

const { src, alt, ...props } = $props();
// TODO docs: https://css-tricks.com/accessible-svgs/
const aria = $derived(
	alt ? { role: "img", "aria-label": alt } : { "aria-hidden": "true" },
);
</script>

<Svg class="icon" {...aria} {...props}>
  <use href={src} />
</Svg>
