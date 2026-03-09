<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["title"]);

const { children, ...props } = $props();
</script>

<abbr {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</abbr>
