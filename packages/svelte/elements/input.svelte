<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"accept",
	"alt",
	"autocomplete",
	"capture",
	"checked",
	"dirname",
	"disabled",
	"form",
	"formaction",
	"formenctype",
	"formmethod",
	"formnovalidate",
	"formtarget",
	"height",
	"list",
	"max",
	"maxlength",
	"min",
	"minlength",
	"multiple",
	"name",
	"pattern",
	"placeholder",
	"popovertarget",
	"popovertargetaction",
	"readonly",
	"required",
	"size",
	"src",
	"step",
	"type",
	"value",
	"width",
]);

const { ...props } = $props();
</script>

<input value="" {...allowedAttributes(props, elementAttributes)} />
