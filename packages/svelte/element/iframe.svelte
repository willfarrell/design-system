<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"allow",
	"allowfullscreen",
	// "align",
	// "allowpaymentrequest",
	// "browsingtopics",
	"credentialless",
	"csp",
	// "frameborder",
	"height",
	"loading",
	// "longdesc",
	// "marginheight",
	// "marginwidth",
	"name",
	"privateToken",
	"referrerpolicy",
	"sandbox",
	// "scrolling",
	"src",
	"srcdoc",
	"width",
]);

const { ...props } = $props();
// TODO add in sandbox default
</script>

<iframe loading="lazy" title="" {...allowedAttributes(props, elementAttributes)}
></iframe>
