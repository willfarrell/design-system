<script>
import ButtonDialogClose from "@willfarrell-ds/svelte/components/ButtonDialogClose.svelte";
import ButtonDialogShow from "@willfarrell-ds/svelte/components/ButtonDialogShow.svelte";
import Dialog from "@willfarrell-ds/svelte/elements/dialog.svelte";
import Footer from "@willfarrell-ds/svelte/elements/footer.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import H1 from "@willfarrell-ds/svelte/elements/h1.svelte";
import Header from "@willfarrell-ds/svelte/elements/header.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import { paragraph } from "#examples/index.js";
</script>

<ButtonDialogShow commandfor="dialog-cmd-id">Open dialog</ButtonDialogShow>
<Dialog id="dialog-cmd-id" aria-labelledby="dialog-cmd-heading">
	<Form method="dialog">
		<Header><H1 id="dialog-cmd-heading">Heading</H1></Header>
		<P>{paragraph}</P>
		<Footer>Dialog footer<ButtonDialogClose commandfor="dialog-cmd-id" autofocus>close</ButtonDialogClose></Footer>
	</Form>
</Dialog>
