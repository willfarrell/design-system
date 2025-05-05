<script>
	import { paragraph } from '@examples/index.js';
	import Div from '@design-system/svelte/element/div.svelte';
	import Details from '@design-system/svelte/element/details.svelte';
	import Summary from '@design-system/svelte/element/summary.svelte';
	import Strong from '@design-system/svelte/element/strong.svelte';
	import P from '@design-system/svelte/element/p.svelte';
</script>

<Div role="group">
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
