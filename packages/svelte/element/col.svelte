<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["span"]);

const { ...props } = $props();
</script>

<col {...allowedAttributes(props, elementAttributes)} />
