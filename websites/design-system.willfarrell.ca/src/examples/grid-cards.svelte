<script>
import Card from "@design-system/components/Card.svelte";
import Image from "@design-system/components/Image.svelte";
import A from "@design-system/elements/a.svelte";
import H3 from "@design-system/elements/h3.svelte";
import Li from "@design-system/elements/li.svelte";
import P from "@design-system/elements/p.svelte";
import Span from "@design-system/elements/span.svelte";
import Ul from "@design-system/elements/ul.svelte";

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
		<Li><Card href={card.href} id={card.id}>
			<H3><A href={card.href} aria-describedby={card.id}>{card.title}</A></H3>
			<P>{card.description}</P>
			<Span aria-hidden="true" id={card.id}>Read more</Span>
			{#snippet img()}
				<Image alt={card.img.alt} src={card.img.src} width="320" height="179" />
			{/snippet}
		</Card></Li>
	{/each}
</Ul>
