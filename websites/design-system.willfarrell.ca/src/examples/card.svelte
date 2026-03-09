<script>
import Card from "@design-system/components/Card.svelte";
import Image from "@design-system/components/Image.svelte"; // TODO update to picture
import A from "@design-system/elements/a.svelte";
import H3 from "@design-system/elements/h3.svelte";
import Li from "@design-system/elements/li.svelte";
import P from "@design-system/elements/p.svelte";
import Span from "@design-system/elements/span.svelte";
import Ul from "@design-system/elements/ul.svelte";

let {
	card = {
		id: "1",
		href: "#",
		title: "Card title",
		description: "Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur",
		button: "Read more",
		img: {
			src: "/img/placeholder/16_9.320x179.png",
			alt: "",
			width: 320,
			height: 179,
		},
	},
} = $props();
</script>

<Ul>
	<Li><Card id={card.id}>
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
	</Card></Li>
</Ul>
