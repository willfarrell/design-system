<script>
	import H4 from './element/H4.svelte'
	import A from './element/a.svelte'
	
	export let id
</script>

<H4 {...$$props}>
	<slot />{#if id}&nbsp;<A href="#{id}">#</A>{/if}
</H4>