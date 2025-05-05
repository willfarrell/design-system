<script>
	import H5 from './element/h5.svelte'
	import A from './element/a.svelte'
	let { children, ...props } = $props();
	let {
		id
	} = props
</script>

<H5 {...props}>
	{@render children?.()}
	{#if id}&nbsp;<A href="#{id}">#</A>{/if}
</H5>