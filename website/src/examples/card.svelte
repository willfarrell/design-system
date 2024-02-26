<script>
	import Ul from '@design-system/svelte/element/ul.svelte';
	import Card from '@design-system/svelte/Card.svelte';
	import H3 from '@design-system/svelte/element/h3.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Span from '@design-system/svelte/element/span.svelte';
	import Img from '@design-system/svelte/element/img.svelte'; // TODO update to picture

	export let card = {
		id: '1',
		href: '#',
		title: 'Card title',
		description: 'Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur',
		img: {
			src: '/img/16_9.320x179.png',
			alt: ''
		}
	}
</script>

<Ul>
<Card href={card.href} id={card.id}>
	<H3><A href={card.href} aria-describedby={card.id}>{card.title}</A></H3>
	<P>{card.description}</P>
	<Span aria-hidden="true" id={card.id}>Read more</Span>
	<Img slot="img" alt={card.img.alt} src={card.img.src} width="320" height="179" />
</Card>
</Ul>