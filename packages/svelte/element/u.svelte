<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, ...props } = $props();
</script>

<u {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</u>
