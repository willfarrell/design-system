<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["datetime"]);

const { children, ...rawProps } = $props();

const props = $derived.by(() => {
	const p = { ...rawProps };
	if (p.datetime instanceof Date) {
		p.datetime = p.datetime.toISOString();
	}
	return p;
});
</script>

<time {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</time>
