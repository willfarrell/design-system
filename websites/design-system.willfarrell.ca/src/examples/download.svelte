<script>
import Icon from "@willfarrell-ds/svelte/components/Icon.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Span from "@willfarrell-ds/svelte/elements/span.svelte";
import downloadUrl from "@willfarrell-ds/vanilla/components/ds-download.js?worker&url";

const record = "example-verification=abc123def456";
</script>

<svelte:head>
	<link rel="modulepreload" href={downloadUrl} />
</svelte:head>

<P><Code id="dns-record">{record}</Code></P>
<Div class="group">
	<Button is="ds-download" data-elem="#dns-record" data-filename="dns.txt"
		><Icon src="/img/icons.svg#download" /><Span>Download</Span></Button
	>
</Div>
