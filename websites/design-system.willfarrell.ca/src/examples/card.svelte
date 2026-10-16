<script>
import Card from "@willfarrell-ds/svelte/components/Card.svelte";
import Image from "@willfarrell-ds/svelte/components/Image.svelte"; // TODO update to picture
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import H3 from "@willfarrell-ds/svelte/elements/h3.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Span from "@willfarrell-ds/svelte/elements/span.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";

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
