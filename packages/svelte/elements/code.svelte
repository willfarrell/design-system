<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, ...props } = $props();
</script>

<code {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</code>
