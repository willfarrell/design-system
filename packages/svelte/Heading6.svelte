<script>
	import H6 from './element/h6.svelte'
	import A from './element/a.svelte'
	
	export let id
</script>

<H6 {...$$props}>
	<slot />{#if id}&nbsp;<A href="#{id}">#</A>{/if}
</H6>