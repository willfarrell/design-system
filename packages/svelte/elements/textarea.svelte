<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"autocomplete",
	"cols",
	"dirname",
	"disabled",
	"form",
	"maxlength",
	"minlength",
	"name",
	"placeholder",
	"readonly",
	"required",
	"rows",
	"wrap",
]);

const { ...props } = $props();
</script>

<textarea {...allowedAttributes(props, elementAttributes)}
  >{props.value}</textarea
>
