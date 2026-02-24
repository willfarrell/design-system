<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["reversed", "start", "type"]);

const { children, ...props } = $props();
</script>

<ol {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</ol>
