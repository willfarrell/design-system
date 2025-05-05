<script>
	import H6 from './element/h6.svelte'
	import A from './element/a.svelte'
	let { children, ...props } = $props();
	let {
		id
	} = props
</script>

<H6 {...props}>
	{@render children?.()}
	{#if id}&nbsp;<A href="#{id}">#</A>{/if}
</H6>