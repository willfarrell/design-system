<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["disabled", "label", "selected", "value"]);

const { children, ...props } = $props();
</script>

<option {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</option>
