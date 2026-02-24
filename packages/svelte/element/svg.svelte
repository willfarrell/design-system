<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, ...props } = $props();
const { alt } = props;
</script>

<svg {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</svg>
