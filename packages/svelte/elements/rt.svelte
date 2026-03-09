<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, ...props } = $props();
</script>

<rt {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</rt>
