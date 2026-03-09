<script>
import Example from "@components/Example.svelte";

const { data } = $props();
const component = $derived(data.component);
</script>

<svelte:head>
	<title>{component} | Demo | Design System</title>
	<meta name="description" content="{component} demo for the semantic fluid design system" />
</svelte:head>

<div>
	<Example {component} />
</div>

<style>
	div {
		padding: 1rem;
	}
</style>
