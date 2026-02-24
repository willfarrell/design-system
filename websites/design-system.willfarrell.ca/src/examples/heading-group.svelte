<script>
import DataTime from "@design-system/svelte/DataTime.svelte";
import Hgroup from "@design-system/svelte/element/hgroup.svelte";
import Small from "@design-system/svelte/element/small.svelte";
import H1 from "@design-system/svelte/Heading1.svelte";
import HSub from "@design-system/svelte/HeadingSub.svelte";
</script>

<Hgroup>
	<H1>Heading 1</H1>
	<HSub>Sub-Heading</HSub>
	<HSub
		><Small>Published on <DataTime datetime="2000-01-01">January 1st, 2000</DataTime></Small></HSub
	>
</Hgroup>
