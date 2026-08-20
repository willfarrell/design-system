<script>
import InputSelect from "./InputSelect.svelte";

const {
	children,
	is = "ds-select-typeahead",
	textNoResults = "No results found",
	...props
} = $props();
</script>

<InputSelect {is} data-i18n-no-results={textNoResults} {...props}>{@render children?.()}</InputSelect>
