<script>
	import H1 from './element/h1.svelte'
	let { children, ...props } = $props();
</script>

<H1 {...props}>
	{@render children?.()}
</H1>