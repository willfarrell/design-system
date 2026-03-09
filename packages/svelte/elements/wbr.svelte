<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([]);

const { ...props } = $props();
</script>

<wbr {...allowedAttributes(props, elementAttributes)} />
