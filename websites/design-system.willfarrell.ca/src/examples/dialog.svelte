<script>
import ButtonDialogClose from "@design-system/components/ButtonDialogClose.svelte";
import ButtonDialogShow from "@design-system/components/ButtonDialogShow.svelte";
import Dialog from "@design-system/elements/dialog.svelte";
import Footer from "@design-system/elements/footer.svelte";
import Form from "@design-system/elements/form.svelte";
import H1 from "@design-system/elements/h1.svelte";
import Header from "@design-system/elements/header.svelte";
import P from "@design-system/elements/p.svelte";
import { paragraph } from "@examples/index.js";
</script>

<ButtonDialogShow commandfor="dialog-cmd-id">Open dialog</ButtonDialogShow>
<Dialog id="dialog-cmd-id" aria-labelledby="dialog-cmd-heading">
	<Form method="dialog">
		<Header><H1 id="dialog-cmd-heading">Heading</H1></Header>
		<P>{paragraph}</P>
		<Footer>Dialog footer<ButtonDialogClose commandfor="dialog-cmd-id" autofocus>close</ButtonDialogClose></Footer>
	</Form>
</Dialog>
