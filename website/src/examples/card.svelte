<script>
	import H3 from '@design-system/svelte/element/h3.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Img from '@design-system/svelte/element/img.svelte';
	import Card from '@design-system/svelte/Card.svelte';

	const src = '#';
</script>

<ul class="grid">
	<Card href="#" id="A card" let:id>
		<H3><A href="#" aria-describedby={id}>A card</A></H3>
		<P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
		<span aria-hidden="true" {id}>Read more</span>
		<Img alt="" {src} slot="img" width="640" height="359" />
	</Card>
	<Card href="#" id="B card" ] let:id>
		<H3><A href="#" aria-describedby={id}>b card</A></H3>
		<P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
		<span aria-hidden="true" {id}>Read more</span>
		<Img alt="" {src} slot="img" width="640" height="359" />
	</Card>
	<Card href="#" id="C card" let:id>
		<H3><A href="#" aria-describedby={id}>C card</A></H3>
		<P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
		<span aria-hidden="true" {id}>Read more</span>
		<Img alt="" {src} slot="img" width="640" height="359" />
	</Card>
</ul>
