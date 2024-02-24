<script>
	import Head from '@components/Head.svelte';
	import Example from '@components/Example.svelte';
	
	export let data;
	const {component} = data
</script>

<svelte:head>
	<Head>
		<title>{component} | Demo | Design System</title>
	</Head>
</svelte:head>

<Example {component} />
