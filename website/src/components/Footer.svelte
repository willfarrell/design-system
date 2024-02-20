<script>
	import Nav from '@design-system/svelte/element/nav.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Address from '@design-system/svelte/element/address.svelte';
	import Footer from '@design-system/svelte/element/footer.svelte';
</script>

<Footer>
	<Nav><A href="#">Return to top</A></Nav>
	<Address>
		<P><A href="mailto:user+alias@example.org">user+alias@example.org</A></P>
		<P><A href="tel:+10000000000x000">+1-000-000-0000 x000</A></P>
		<P>Unit A, 1 Address Street, City, Region, Country, Postcode</P>
	</Address>
	<!-- social icons -->
</Footer>
