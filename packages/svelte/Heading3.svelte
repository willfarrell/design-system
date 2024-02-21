<script>
	import H3 from './element/h3.svelte'
	import A from './element/a.svelte'
	
	export let id
</script>

<H3 {...$$props}>
	<slot />{#if id}&nbsp;<A href="#{id}">#</A>{/if}
</H3>