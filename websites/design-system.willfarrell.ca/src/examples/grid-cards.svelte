<script>
import Card from "@willfarrell-ds/svelte/components/Card.svelte";
import Image from "@willfarrell-ds/svelte/components/Image.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import H3 from "@willfarrell-ds/svelte/elements/h3.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Span from "@willfarrell-ds/svelte/elements/span.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";

const cards = [
	{
		id: "g1",
		href: "#",
		title: "Card title",
		description: "Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur",
		img: {
			src: "/img/placeholder/16_9.320x179.png",
			alt: "",
		},
	},
	{
		id: "g2",
		href: "#",
		title: "Card title",
		description: "Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur",
		img: {
			src: "/img/placeholder/16_9.320x179.png",
			alt: "",
		},
	},
	{
		id: "g3",
		href: "#",
		title: "Card title",
		description: "Commodo ut laborum",
		img: {
			src: "/img/placeholder/16_9.320x179.png",
			alt: "",
		},
	},
];
</script>

<Ul class="grid">
	{#each cards as card}
		<Li><Card id={card.id}>
			<H3><A href={card.href} aria-describedby={card.id}>{card.title}</A></H3>
			<P>{card.description}</P>
			<Span aria-hidden="true" id={card.id}>Read more</Span>
			{#snippet img()}
				<Image alt={card.img.alt} src={card.img.src} width="320" height="179" />
			{/snippet}
		</Card></Li>
	{/each}
</Ul>
