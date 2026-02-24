<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["for"]);

const { children, ...props } = $props();
</script>

<label {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</label>
