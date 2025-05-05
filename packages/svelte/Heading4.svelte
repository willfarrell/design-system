<script>
	import H4 from './element/h4.svelte'
	import A from './element/a.svelte'
	let { children, ...props } = $props();
	let {
		id
	} = props
</script>

<H4 {...props}>
	{@render children?.()}{#if id}&nbsp;<A href="#{id}">#</A>{/if}
</H4>