<script>
	import H2 from './element/h2.svelte'
	import HeadingAnchor from './HeadingAnchor.svelte'
	
	export let id
</script>

<H2 {...$$props} {id}>
	<slot />
	<HeadingAnchor {id}/>
</H2>