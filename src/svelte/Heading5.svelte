<script>
	import H5 from './element/H5.svelte'
	import A from './element/a.svelte'
	
	export let id
</script>

<H5 {...$$props}>
	<slot />{#if id}&nbsp;<A href="#{id}">#</A>{/if}
</H5>