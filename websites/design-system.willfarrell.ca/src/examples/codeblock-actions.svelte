<script>
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Pre from "@willfarrell-ds/svelte/elements/pre.svelte";
import actionsUrl from "@willfarrell-ds/vanilla/components/ds-codeblock-actions.js?worker&url";

const command = "npm install @willfarrell-ds/vanilla";
const token = btoa(JSON.stringify({ alg: "EdDSA", typ: "JWT" }));
</script>

<svelte:head>
	<link rel="modulepreload" href={actionsUrl} />
</svelte:head>

<Pre is="ds-codeblock-actions"><Code>{command}</Code></Pre>
<Pre
	is="ds-codeblock-actions"
	data-i18n-copy="Copy token"
	data-i18n-copied="Token copied"
><Code>{token}</Code></Pre>
<Pre is="ds-codeblock-actions" data-filename=""><Code>{token}</Code></Pre>
