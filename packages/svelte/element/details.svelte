<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["open", "name"]);

const { children, ...props } = $props();
</script>

<details {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</details>
