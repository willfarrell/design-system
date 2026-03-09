<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, ...props } = $props();
</script>

<thead {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</thead>
