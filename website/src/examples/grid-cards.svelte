<script>
	import Example from '@components/Example.svelte'

	const cards = [{
		id: '1',
		href: '#',
		title: 'Card title',
		description: 'Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur',
		img: {
			src: '/img/16_9.320x179.png'
		}
	},{
		id: '2',
		href: '#',
		title: 'Card title',
		description: 'Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur',
		img: {
			src: '/img/16_9.320x179.png'
		}
	},{
		id: '3',
		href: '#',
		title: 'Card title',
		description: 'Commodo ut laborum',
		img: {
			src: '/img/16_9.320x179.png'
		}
	}]
</script>

<ul class="grid">
	{#each cards as card}
	<Example component="card" card={card} />
	{/each}
</ul>
