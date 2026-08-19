<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["for"]);

const { children, ...props } = $props();
</script>

<!-- biome-ignore lint/a11y/noLabelWithoutControl: for is passed via props by consumer -->
<label {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</label>
