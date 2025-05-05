<script>
	import { paragraph } from '@examples/index.js';
	import Form from '@design-system/svelte/element/form.svelte';
	import Header from '@design-system/svelte/element/header.svelte';
	import Footer from '@design-system/svelte/element/footer.svelte';
	import Dialog from '@design-system/svelte/element/dialog.svelte';
	import Div from '@design-system/svelte/element/div.svelte';
	import H1 from '@design-system/svelte/element/h1.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
</script>

<Button is="ds-button-dialog" data-dialog="dialog-btn-id">Open dialog</Button>
<Dialog id="dialog-btn-id" aria-labelledby="dialog-heading" inert is="ds-dialog">
	<Form method="dialog">
		<Header><H1 id="dialog-heading">Heading</H1></Header>
		<P>{paragraph}</P>
		<Footer>Dialog footer<Button type="submit">close</Button></Footer>
	</Form>
</Dialog>

<!-- Doesn't require js, but `esc` focuses close button instead of closing -->
<!-- <Button popovertarget="dialog-btn-id" popovertargetaction="show">Open dialog</Button>
<Dialog id="dialog-btn-id" popover>
	<Header><Button popovertarget="dialog-btn-id" popovertargetaction="hide">close</Button></Header>
	<P>{paragraph}</P>
	<Footer>Dialog footer</Footer>
</Dialog> -->
