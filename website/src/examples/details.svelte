<script>
	import { paragraph } from '@examples/index.js';
	import Details from '@design-system/svelte/element/details.svelte';
	import Summary from '@design-system/svelte/element/summary.svelte';
	import Strong from '@design-system/svelte/element/strong.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	const { ...props } = $props();
</script>

<Details {...props}>
	<Summary><Strong>Summary</Strong></Summary>
	<P>{paragraph}</P>
</Details>
