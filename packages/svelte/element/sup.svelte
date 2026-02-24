<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, ...props } = $props();
</script>

<sup {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</sup>
