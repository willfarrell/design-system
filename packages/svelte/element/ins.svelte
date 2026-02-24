<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["cite", "datetime"]);

const { children, ...props } = $props();
</script>

<ins {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</ins>
