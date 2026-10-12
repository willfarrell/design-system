<script>
import makeExampleComponent from "#examples/index.js";
import components from "#examples/registry.js";

const { component, ...props } = $props();

const SvelteComponent = $derived(
	components[makeExampleComponent(component ?? "")],
);
</script>

<SvelteComponent {...props} />
