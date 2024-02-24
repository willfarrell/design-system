<script>	
	import Div from '@design-system/svelte/element/div.svelte';
	import Li from '@design-system/svelte/element/li.svelte';
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

<Li class="card" is="ds-card">
	<Div class="text">
		<slot id="card-{slugify(id)}" />
	</Div>
	{#if $$slots.img}
		<Div class="img"><slot name="img"/></Div>
	{/if}
</Li>
