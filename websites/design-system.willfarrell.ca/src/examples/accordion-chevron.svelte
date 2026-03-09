<script>
import Details from "@design-system/elements/details.svelte";
import Div from "@design-system/elements/div.svelte";
import P from "@design-system/elements/p.svelte";
import Strong from "@design-system/elements/strong.svelte";
import Summary from "@design-system/elements/summary.svelte";
import { paragraph } from "@examples/index.js";
</script>

<Div role="group">
	<Details name="group" class="chevron">
		<Summary><Strong>Summary A</Strong></Summary>
		<P>{paragraph}</P>
	</Details>
	<Details name="group" class="chevron">
		<Summary><Strong>Summary B</Strong></Summary>
		<P>{paragraph}</P>
	</Details>
	<Details name="group" class="chevron">
		<Summary><Strong>Summary C</Strong></Summary>
		<P>{paragraph}</P>
	</Details>
</Div>
