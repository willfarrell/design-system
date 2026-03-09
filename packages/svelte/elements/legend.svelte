<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, ...props } = $props();
</script>

<legend {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</legend>
