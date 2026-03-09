<script>
    import { pascalCase } from "change-case";

    const makeVariableComponent = (component) => {
	return `Variable${pascalCase(component)}`;
    };

const { component, ...props } = $props();
const components = {
	// VariableH2
};
const componentName = $derived(makeVariableComponent(component ?? ""));
const importedComponent = $derived(components[componentName]);
const SvelteComponent = $derived.by(() => {
	if (!importedComponent) {
		console.error(component, "aka", componentName, "missing");
	}
	return importedComponent;
});
</script>

{#if SvelteComponent}
	<SvelteComponent {...props} />
{:else}
	<p>TODO Need to wire up variable {component}</p>
{/if}
