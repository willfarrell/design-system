<script>
	import makeVarableComponent from '@variables/index.js';

	// import VariableH2 from '@variables/H2.svelte';

	const { component, ...props } = $props();
	const components = {
		// VariableH2
	};
	const componentName = makeVarableComponent(component ?? '');
	const importedComponent = components[componentName];
	if (!importedComponent) {
		console.error(component, 'aka', componentName, 'missing');
	}
	const SvelteComponent = $derived(importedComponent);
</script>

{#if SvelteComponent}
	<SvelteComponent {...props} />
{:else}
	<p>TODO Need to wire up variable {component}</p>
{/if}
