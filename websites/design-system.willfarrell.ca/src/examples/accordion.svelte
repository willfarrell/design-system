<script>
import Details from "@willfarrell-ds/svelte/elements/details.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Strong from "@willfarrell-ds/svelte/elements/strong.svelte";
import Summary from "@willfarrell-ds/svelte/elements/summary.svelte";
import { paragraph } from "#examples/index.js";
</script>

<Div>
	<Details name="group">
		<Summary><Strong>Summary A</Strong></Summary>
		<P>{paragraph}</P>
	</Details>
	<Details name="group">
		<Summary><Strong>Summary B</Strong></Summary>
		<P>{paragraph}</P>
	</Details>
	<Details name="group">
		<Summary><Strong>Summary C</Strong></Summary>
		<P>{paragraph}</P>
	</Details>
</Div>
