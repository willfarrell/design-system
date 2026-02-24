<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, ...props } = $props();
</script>

<samp {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</samp>
