<script>
import Details from "@willfarrell-ds/svelte/elements/details.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Strong from "@willfarrell-ds/svelte/elements/strong.svelte";
import Summary from "@willfarrell-ds/svelte/elements/summary.svelte";
import { paragraph } from "#examples/index.js";

const { ...props } = $props();
</script>

<Details {...props}>
	<Summary><Strong>Summary</Strong></Summary>
	<P>{paragraph}</P>
</Details>
