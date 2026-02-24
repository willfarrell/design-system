<script>
import ButtonDialogClose from "@design-system/svelte/ButtonDialogClose.svelte";
import ButtonDialogShow from "@design-system/svelte/ButtonDialogShow.svelte";
import Button from "@design-system/svelte/element/button.svelte";
import Dialog from "@design-system/svelte/element/dialog.svelte";
import Footer from "@design-system/svelte/element/footer.svelte";
import Form from "@design-system/svelte/element/form.svelte";
import H1 from "@design-system/svelte/element/h1.svelte";
import Header from "@design-system/svelte/element/header.svelte";
import P from "@design-system/svelte/element/p.svelte";
import { paragraph } from "@examples/index.js";
</script>

<Button is="ds-button-dialog" data-dialog="dialog-btn-js">Open dialog (js)</Button>
<Dialog id="dialog-btn-js" aria-labelledby="dialog-heading" inert is="ds-dialog">
	<Form method="dialog">
		<Header><H1 id="dialog-heading">Heading</H1></Header>
		<P>{paragraph}</P>
		<Footer>Dialog footer<Button type="submit">close</Button></Footer>
	</Form>
</Dialog>

<ButtonDialogShow id="dialog-btn-id">Open dialog (command)</ButtonDialogShow>
<Dialog id="dialog-btn-id" aria-labelledby="dialog-heading" inert>
	<Header><H1 id="dialog-heading">Heading</H1></Header>
	<P>{paragraph}</P>
	<Footer>Dialog footer<ButtonDialogClose>close</ButtonDialogClose></Footer>
</Dialog>
