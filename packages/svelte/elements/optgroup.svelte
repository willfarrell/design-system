<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["disabled", "label"]);

const { children, ...props } = $props();
</script>

<optgroup {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</optgroup>
