<script>
import Time from "@design-system/svelte/element/time.svelte";
import { page } from "$app/state";

const { value, ...props } = $props();

const getLocalizedDate = (value, locale, options = {}) => {
	if (!value) return value;
	options.dateStyle ??= "long";
	return new Intl.DateTimeFormat(locale, options).format(new Date(value));
};
</script>

{#if true}
  {@const label = getLocalizedDate(value, page.locale ?? "en-CA", props)}
  <Time datatime={value} {...props}>{label}</Time>
{/if}
