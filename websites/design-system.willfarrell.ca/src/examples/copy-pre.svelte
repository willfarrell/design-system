<script>
import Code from "@design-system/elements/code.svelte";
import Pre from "@design-system/elements/pre.svelte";
import copyPreUrl from "@willfarrell-ds/vanilla/components/ds-copy-pre.js?worker&url";

const command = "npm install @willfarrell-ds/vanilla";
const token = btoa(JSON.stringify({ alg: "EdDSA", typ: "JWT" }));
</script>

<svelte:head>
	<link rel="modulepreload" href={copyPreUrl} />
</svelte:head>

<Pre is="ds-copy-pre"><Code>{command}</Code></Pre>
<Pre
	is="ds-copy-pre"
	data-i18n-copy="Copy token"
	data-i18n-copied="Token copied"
><Code>{token}</Code></Pre>
