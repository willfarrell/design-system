<script>
import codeblockUrl from "@willfarrell-ds/vanilla/components/ds-codeblock.js?worker&url";
import copyPreUrl from "@willfarrell-ds/vanilla/components/ds-copy-pre.js?worker&url";
import formatHtml from "pretty";
import Code from "../elements/code.svelte";
import Pre from "../elements/pre.svelte";

// icon/copy/copied are the copy button's, left undefined the attribute is
// omitted and ds-copy-pre keeps its own defaults
const {
	language = "js",
	code,
	icon,
	copy,
	copied,
	children,
	...props
} = $props();

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
  <link rel="modulepreload" href={copyPreUrl} />
  <link rel="modulepreload" href={codeblockUrl} />
</svelte:head>
<Pre
  is="ds-copy-pre"
  data-icon={icon}
  data-i18n-copy={copy}
  data-i18n-copied={copied}
><Code is="ds-codeblock" data-lang={language} {...props}>{text}</Code></Pre>

