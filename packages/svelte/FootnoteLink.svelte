<script>
	import A from '@design-system/svelte/element/a.svelte'
	export let id
</script>

<A aria-describedby="footnote-label" href="#footnote-{id}" id="footnote-{id}-ref"><slot/></A> 