<script>	
	export let id
	
	const slugify = (id) => {
		return id
		.toLocaleLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
	}
</script>
	
<!-- src: https://inclusive-components.design/cards/ -->

<li class="card" is="ds-card">
	<div class="text">
		<slot id="card-{slugify(id)}" />
	</div>
	{#if $$slots.img}
		<div class="img"><slot name="img"/></div>
	{/if}
</li>
