<script>
import Icon from "@willfarrell-ds/svelte/components/Icon.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Span from "@willfarrell-ds/svelte/elements/span.svelte";
import copyUrl from "@willfarrell-ds/vanilla/components/ds-copy.js?worker&url";
import downloadUrl from "@willfarrell-ds/vanilla/components/ds-download.js?worker&url";

const record = "tardisec-verification=abc123def456";
</script>

<svelte:head>
	<link rel="modulepreload" href={copyUrl} />
	<link rel="modulepreload" href={downloadUrl} />
</svelte:head>

<P><Code id="dns-record">{record}</Code></P>
<Div class="group">
	<Button is="ds-copy" data-elem="#dns-record"
		><Icon src="/img/icons.svg#copy" /><Span>Copy</Span></Button
	>
	<Button is="ds-download" data-elem="#dns-record" data-filename="dns.txt"
		><Icon src="/img/icons.svg#download" /><Span>Download</Span></Button
	>
	<Button is="ds-copy" data-value={record} data-i18n-copied="Record copied"
		><Icon src="/img/icons.svg#copy" /><Span>Copy record</Span></Button
	>
</Div>
