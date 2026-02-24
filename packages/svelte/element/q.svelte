<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["cite"]);

const { children, ...props } = $props();
</script>

<q {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</q>
