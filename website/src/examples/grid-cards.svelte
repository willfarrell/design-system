<script>
	import Ul from '@design-system/svelte/element/ul.svelte';
	import Card from '@design-system/svelte/Card.svelte';
	import H3 from '@design-system/svelte/element/h3.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Span from '@design-system/svelte/element/span.svelte';
	import Image from '@design-system/svelte/Image.svelte';

	const cards = [
		{
			id: 'g1',
			href: '#',
			title: 'Card title',
			description: 'Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur',
			img: {
				src: '/img/placeholder/16_9.320x179.png'
			}
		},
		{
			id: 'g2',
			href: '#',
			title: 'Card title',
			description: 'Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur',
			img: {
				src: '/img/placeholder/16_9.320x179.png'
			}
		},
		{
			id: 'g3',
			href: '#',
			title: 'Card title',
			description: 'Commodo ut laborum',
			img: {
				src: '/img/placeholder/16_9.320x179.png'
			}
		}
	];
</script>

<Ul class="grid" style="">
	{#each cards as card}
		<Card href={card.href} id={card.id}>
			<H3><A href={card.href} aria-describedby={card.id}>{card.title}</A></H3>
			<P>{card.description}</P>
			<Span aria-hidden="true" id={card.id}>Read more</Span>
			{#snippet img()}
				<Image alt={card.img.alt} src={card.img.src} width="320" height="179" />
			{/snippet}
		</Card>
	{/each}
</Ul>
