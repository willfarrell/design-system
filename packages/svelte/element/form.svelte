<script>
import { setContext } from "svelte";
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set([
	"accept",
	"accept-charset",
	"autocapitalize",
	"autocomplete",
	"name",
	"rel",
	"action",
	"enctype",
	"method",
	"novalidate",
	"target",
]);

const { errors, children, ...props } = $props();

// TODO really needed? test
if (props?.action && props.action?.substring(0, 1) !== "/") {
	props.action = `?/${props.action ?? ""}`;
}

setContext("form", {
	get errors() {
		return errors;
	},
});
</script>

<form method="POST" novalidate {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</form>
