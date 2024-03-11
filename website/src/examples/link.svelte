<script>
	import { page } from '$app/stores'
	import P from '@design-system/svelte/element/p.svelte';
	import A from '@design-system/svelte/element/a.svelte';
</script>

<P>
	<A href="#">link</A>
	<A href="{$page.url.pathname}">link (current page)</A>
	<A href="#" class="force active">link (active)</A>
	<A href="#" class="force focus">link (focus)</A>
	<A href="#" class="force hover">link (hover)</A>
	<A href="#" class="force visited">link (visited)</A>
	<A href="https://example.org">link (external)</A>
</P>
