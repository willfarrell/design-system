<script>
import Aside from "../elements/aside.svelte";
import H3 from "../elements/h3.svelte";

const { children, id, label, ...props } = $props();
const uid = $props.id();

const slugify = (id) =>
	id
		.toLocaleLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "")
		.replace(/--+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");

const labelledby = $derived(`callout-${id ? slugify(id) : uid}`);
</script>

<Aside aria-labelledby={labelledby} {...props}>
  <H3 id={labelledby}>{label}</H3>
  {@render children?.({ id: labelledby })}
</Aside>
