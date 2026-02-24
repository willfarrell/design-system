<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["span"]);

const { children, ...props } = $props();
</script>

<colgroup {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</colgroup>
