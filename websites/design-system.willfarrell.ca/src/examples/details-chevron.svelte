<script>
import Details from "@design-system/elements/details.svelte";
import P from "@design-system/elements/p.svelte";
import Strong from "@design-system/elements/strong.svelte";
import Summary from "@design-system/elements/summary.svelte";
import { paragraph } from "@examples/index.js";
</script>

<Details class="chevron">
	<Summary><Strong>Summary</Strong></Summary>
	<P>{paragraph}</P>
</Details>
