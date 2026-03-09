<script>
import Button from "@design-system/elements/button.svelte";
import Dialog from "@design-system/elements/dialog.svelte";
import Footer from "@design-system/elements/footer.svelte";
import Form from "@design-system/elements/form.svelte";
import H1 from "@design-system/elements/h1.svelte";
import Header from "@design-system/elements/header.svelte";
import P from "@design-system/elements/p.svelte";
import { paragraph } from "@examples/index.js";
</script>

<Button is="ds-button-dialog" data-dialog="dialog-id">Open dialog</Button>
<Dialog id="dialog-id" aria-labelledby="dialog-heading" inert is="ds-dialog">
	<Form method="dialog">
		<Header><H1 id="dialog-heading">Heading</H1></Header>
		<P>{paragraph}</P>
		<Footer>Dialog footer<Button type="submit" autofocus>close</Button></Footer>
	</Form>
</Dialog>
