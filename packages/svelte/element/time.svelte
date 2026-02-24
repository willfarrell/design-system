<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["datetime"]);

const { children, ...props } = $props();

if (props.datetime instanceof Date) {
	props.datetime = props.datetime.toISOString();
}
</script>

<time {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</time>
