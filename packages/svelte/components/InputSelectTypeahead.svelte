<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-select-typeahead.js?worker&url";
import InputSelect from "./InputSelect.svelte";

const {
	children,
	is = "ds-select-typeahead",
	textNoResults = "No results found",
	...props
} = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<InputSelect {is} data-i18n-no-results={textNoResults} {...props}>{@render children?.()}</InputSelect>
