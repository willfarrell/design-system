<script>
	import Nav from './element/nav.svelte'
	
</script>
<Nav {...$$props} is="ds-scrollspy">
	<slot/>
</Nav>