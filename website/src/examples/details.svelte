<script>
	import { paragraph } from '@examples/index.js';
	import Details from '@design-system/svelte/element/details.svelte';
	import Summary from '@design-system/svelte/element/summary.svelte';
</script>

<Details>
	<Summary>Summary</Summary>
	{paragraph}
</Details>
