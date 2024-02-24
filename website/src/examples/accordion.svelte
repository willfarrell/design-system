<script>
	import Div from '@design-system/svelte/element/div.svelte';
	import Details from '@design-system/svelte/element/details.svelte';
	import Summary from '@design-system/svelte/element/summary.svelte';
</script>

<Div role="group">
	<Details name="group">
		<Summary>Summary A</Summary>
		details
	</Details>
	<Details name="group">
		<Summary>Summary B</Summary>
		details
	</Details>
	<Details name="group">
		<Summary>Summary C</Summary>
		details
	</Details>
</Div>
