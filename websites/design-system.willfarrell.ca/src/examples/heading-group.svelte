<script>
import DataTime from "@design-system/components/DataTime.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import Small from "@design-system/elements/small.svelte";
</script>

<Hgroup>
	<H1>Heading 1</H1>
	<HSub>Sub-Heading</HSub>
	<HSub
		><Small>Published on <DataTime datetime="2000-01-01">January 1st, 2000</DataTime></Small></HSub
	>
</Hgroup>
