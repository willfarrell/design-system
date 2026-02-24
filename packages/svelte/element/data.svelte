<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["value"]);

const { children, ...props } = $props();
</script>

<data {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</data>
