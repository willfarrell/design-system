<script>
	import Nav from './element/nav.svelte'
	let { children, ...props } = $props();
	let {
		is = 'ds-scrollspy'
	} = props
</script>
<Nav {...props} {is}>
	{@render children?.()}
</Nav>