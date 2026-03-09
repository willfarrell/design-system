<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { children, ...props } = $props();
</script>

<article {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</article>
