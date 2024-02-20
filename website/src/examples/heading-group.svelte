<script>
	import Hgroup from '@design-system/svelte/element/hgroup.svelte';
	import H1 from '@design-system/svelte/Heading1.svelte';
	import HSub from '@design-system/svelte/HeadingSub.svelte';
	import Small from '@design-system/svelte/element/small.svelte';
	import Time from '@design-system/svelte/element/time.svelte';
</script>

<Hgroup>
	<H1>Heading 1</H1>
	<HSub>Sub-Heading</HSub>
	<HSub><Small>Published on <Time datetime="2000-01-01">January 1st, 2000</Time></Small></HSub>
</Hgroup>
