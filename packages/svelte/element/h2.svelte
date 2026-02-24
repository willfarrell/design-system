<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, ...props } = $props();
</script>

<h2 {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</h2>
