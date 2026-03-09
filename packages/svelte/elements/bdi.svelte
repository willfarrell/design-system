<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, ...props } = $props();
</script>

<bdi {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</bdi>
