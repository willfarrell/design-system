<script>
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Dialog from "@willfarrell-ds/svelte/elements/dialog.svelte";
import Footer from "@willfarrell-ds/svelte/elements/footer.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import H1 from "@willfarrell-ds/svelte/elements/h1.svelte";
import Header from "@willfarrell-ds/svelte/elements/header.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import { paragraph } from "#examples/index.js";
</script>

<Button is="ds-button-dialog" data-dialog="dialog-id">Open dialog</Button>
<Dialog id="dialog-id" aria-labelledby="dialog-heading" inert is="ds-dialog">
	<Form method="dialog">
		<Header><H1 id="dialog-heading">Heading</H1></Header>
		<P>{paragraph}</P>
		<Footer>Dialog footer<Button type="submit" autofocus>close</Button></Footer>
	</Form>
</Dialog>
