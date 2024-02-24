<script>
	import {paragraph} from '@examples/index.js'
	import Form from '@design-system/svelte/element/form.svelte';
	import Header from '@design-system/svelte/element/header.svelte';
	import Footer from '@design-system/svelte/element/footer.svelte';
	import Dialog from '@design-system/svelte/element/dialog.svelte';
	import Div from '@design-system/svelte/element/div.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
</script>

<Button is="ds-button-dialog" data-dialog="dialog">Open dialog</Button>
<Dialog id="dialog">
	<Form method="dialog">
		<Header><Button type="submit">close</Button></Header>
		<Div>{paragraph}</Div>
		<Footer></Footer>
	</Form>
</Dialog>
