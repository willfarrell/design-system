<script>
	import H2 from './element/h2.svelte'
	import HeadingAnchor from './HeadingAnchor.svelte'
	let { children, ...props } = $props();
	let {
		id
	} = props
</script>

<H2 {...props} {id}>
	{@render children?.()}
	<HeadingAnchor {id}/>
</H2>