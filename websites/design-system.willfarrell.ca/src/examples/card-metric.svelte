<script>
import CardMetric from "@willfarrell-ds/svelte/components/CardMetric.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
</script>

<Ul class="grid">
	<Li><CardMetric id="metric-domains" value={12}>Domains monitored</CardMetric></Li>
	<Li><CardMetric id="metric-findings" value={3}>Open findings</CardMetric></Li>
</Ul>
