<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["height", "src", "type", "width"]);

const { ...props } = $props();
</script>

<embed {...allowedAttributes(props, elementAttributes)} />
