<script>
import Aside from "../elements/aside.svelte";
import H3 from "../elements/h3.svelte";

let { children, id, label, ...props } = $props();

const slugify = (id) => {
	if (!id) {
		return Math.random().toString(36).slice(2);
	}
	return id
		.toLocaleLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "")
		.replace(/--+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
};
</script>

{#if true}
  {@const labelledby = `callout-${slugify(id)}`}
  <Aside aria-labelledby={labelledby} {...props}>
    <H3 id={labelledby}>{label}</H3>
    {@render children?.({ id: labelledby })}
  </Aside>
{/if}
