<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["name"]);

const { children, ...props } = $props();
</script>

<map {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</map>
