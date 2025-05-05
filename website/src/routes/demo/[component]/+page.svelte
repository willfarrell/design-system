<script>
	import Head from '@components/Head.svelte';
	import Example from '@components/Example.svelte';

	let { data } = $props();
	const { component } = data;
</script>

<Head>
	<title>{component} | Demo | Design System</title>
</Head>

<div>
	<Example {component} />
</div>

<style>
	div {
		padding: 1rem;
	}
</style>
