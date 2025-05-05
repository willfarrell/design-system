<script>
	import Ul from '@design-system/svelte/element/ul.svelte';
	import Card from '@design-system/svelte/Card.svelte';
	import H3 from '@design-system/svelte/element/h3.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Span from '@design-system/svelte/element/span.svelte';
	import Image from '@design-system/svelte/Image.svelte'; // TODO update to picture

	let {
		card = {
			id: '1',
			href: '#',
			title: 'Card title',
			description: 'Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur',
			button: 'Read more',
			img: {
				src: '/img/placeholder/16_9.320x179.png',
				alt: '',
				width: 320,
				height: 179
			}
		}
	} = $props();
</script>

<Ul>
	<Card id={card.id}>
		<H3><A href={card.href} aria-describedby={card.id}>{card.title}</A></H3>
		{#if card.description}
			<P>{card.description}</P>
		{/if}
		{#if card.button}
			<Span aria-hidden="true" id={card.id}>{card.button}</Span>
		{/if}
		{#snippet img()}
			<Image {...card.img} />
		{/snippet}
	</Card>
</Ul>
