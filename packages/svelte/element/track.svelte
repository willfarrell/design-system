<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"default",
	"kind",
	"label",
	"src",
	"srclang",
]);

const { children, ...props } = $props();
</script>

<track {...allowedAttributes(props, elementAttributes)} />
