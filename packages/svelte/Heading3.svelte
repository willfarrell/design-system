<script>
	import H3 from './element/h3.svelte'
	import A from './element/a.svelte'
	let { children, ...props } = $props();
	let { 
		id
	} = props
</script>

<H3 {...props}>
	{@render children?.()}
	{#if id}&nbsp;<A href="#{id}">#</A>{/if}
</H3>