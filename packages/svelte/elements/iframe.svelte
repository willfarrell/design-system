<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"allow",
	"allowfullscreen",
	"credentialless",
	"csp",
	"height",
	"loading",
	"name",
	"privateToken",
	"referrerpolicy",
	"sandbox",
	"src",
	"srcdoc",
	"width",
]);

const { title, ...props } = $props();
</script>

<iframe
  {title}
  loading="lazy"
  sandbox=""
  {...allowedAttributes(props, elementAttributes)}
></iframe>
