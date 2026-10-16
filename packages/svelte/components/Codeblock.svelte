<script>
    import actionsUrl from "@willfarrell-ds/vanilla/components/ds-codeblock-actions.js?worker&url";
import highlightUrl from "@willfarrell-ds/vanilla/components/ds-codeblock-highlight.js?worker&url";
import copyUrl from "@willfarrell-ds/vanilla/components/ds-copy.js?worker&url";
import downloadUrl from "@willfarrell-ds/vanilla/components/ds-download.js?worker&url";
import formatHtml from "pretty";
import Code from "../elements/code.svelte";
import Pre from "../elements/pre.svelte";

const grammarUrls = import.meta.glob(
	"../../vanilla/components/ds-codeblock-highlight/*.js",
	{ query: "?worker&url", import: "default", eager: true },
);

const {
	language = "js",
	code,
	icon,
	copy,
	copied,
	filename = "",
	actions = true,
	children,
	...props
} = $props();

const grammarUrl = $derived(
	grammarUrls[
		`../../vanilla/components/ds-codeblock-highlight/ds-codeblock-highlight-${language}.js`
	],
);

const text = $derived.by(() => {
	if (typeof code === "object") {
		const { html } = code.render();
		return formatHtml(html, { ocd: true });
	}
	if (typeof code !== "string") {
		return "error";
	}
	if (code.includes("<html")) {
		return formatHtml(code, { ocd: true });
	}
	return code;
});
</script>

<svelte:head>
  {#if actions}<link rel="modulepreload" href={actionsUrl} />{/if}
  <link rel="modulepreload" href={highlightUrl} />
  {#if grammarUrl}<link rel="modulepreload" data-lang={language} href={grammarUrl} />{/if}
  {#if actions}
    <link rel="modulepreload" href={copyUrl} />
    <link rel="modulepreload" href={downloadUrl} />
  {/if}
</svelte:head>
{#if actions}<Pre
  is="ds-codeblock-actions"
  data-icon={icon}
  data-i18n-copy={copy}
  data-i18n-copied={copied}
  data-filename={filename}
><Code is="ds-codeblock-highlight" data-lang={language} {...props}>{text}</Code></Pre>{:else}<Pre><Code is="ds-codeblock-highlight" data-lang={language} {...props}>{text}</Code></Pre>{/if}
