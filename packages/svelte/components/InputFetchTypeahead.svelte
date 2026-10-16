<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-fetch-typeahead.js?worker&url";
import Datalist from "../elements/datalist.svelte";
import FieldInput from "./FieldInput.svelte";

const {
	children,
	src,
	param,
	criteria,
	textLoading,
	textError,
	textNoResults,
	...props
} = $props();
const { id } = props;

const criteriaAttributes = $derived(
	Object.fromEntries(
		Object.entries(criteria ?? {}).map(([key, value]) => [
			`data-criteria-${key}`,
			value,
		]),
	),
);
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<FieldInput
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  is="ds-fetch-typeahead"
  {...props}
  list="{id}-datalist"
  data-src={src}
  data-param={param}
  data-i18n-loading={textLoading}
  data-i18n-error={textError}
  data-i18n-no-results={textNoResults}
  {...criteriaAttributes}
>
  <Datalist id="{id}-datalist">
    {@render children?.()}
  </Datalist>
</FieldInput>
