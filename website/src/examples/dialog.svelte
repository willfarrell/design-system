<script>
	import Form from '@design-system/svelte/element/form.svelte';
	import Header from '@design-system/svelte/element/header.svelte';
	import Footer from '@design-system/svelte/element/footer.svelte';
	import Dialog from '@design-system/svelte/element/dialog.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
	const p =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
</script>

<Dialog id="dialog">
	<Form method="dialog">
		<Header><Button type="submit">close</Button></Header>
		<div>content{p}{p}{p}{p}{p}{p}{p}{p}{p}{p}{p}{p}{p}{p}</div>
		<Footer></Footer>
	</Form>
</Dialog>
