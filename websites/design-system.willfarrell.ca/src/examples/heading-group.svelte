<script>
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import Hgroup from "@willfarrell-ds/svelte/elements/hgroup.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
</script>

<Hgroup>
	<H1>Heading 1</H1>
	<HSub>Sub-Heading</HSub>
	<HSub
		><Small>Published on <DataTime datetime="2000-01-01">January 1st, 2000</DataTime></Small></HSub
	>
</Hgroup>
