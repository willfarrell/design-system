<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["closedby", "open"]);

const { children, id, ...props } = $props();
</script>

<dialog closedby="any" {id} {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</dialog>
