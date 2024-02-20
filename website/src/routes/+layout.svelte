<script>
	import Header from '@design-system/svelte/element/header.svelte';
	import Nav from '@design-system/svelte/element/nav.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Footer from '@design-system/svelte/element/footer.svelte';
	
</script>

<Header>
	<Nav>
		<A href="#main" class="skip">Skip to main content</A>
		<!--  -->
		<!--<ul>
			<li>
				<a href="#footer">link</a>
				<ul>
					<li>sub-link</li>
				</ul>
			</li>
		</ul>-->
	</Nav>
</Header>
<slot />
<Footer>
	<Nav>
		<A href="#">Return to top</A>
	</Nav>
</Footer>
