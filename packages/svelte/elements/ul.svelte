<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, ...props } = $props();
</script>

<ul {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</ul>
