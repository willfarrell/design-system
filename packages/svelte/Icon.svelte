<script>
import Svg from "./element/svg.svelte";

const { src, alt, ...props } = $props();

// TODO docs: https://css-tricks.com/accessible-svgs/
</script>

<Svg class="icon" aria-hidden="true" focusable="false" {...props}>
  <use href={src} />
</Svg>
