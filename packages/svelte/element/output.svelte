<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["for", "form", "name"]);

const { children, ...props } = $props();
</script>

<output {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</output>
