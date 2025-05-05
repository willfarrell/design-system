<script>
	import A from './element/a.svelte'
	let { id } = $props()
</script>

{#if id}
	<A href="#{id}" class="noprint"><span aria-hidden="true">#</span><span class="visually-hidden">anchor</span></A>
{/if}