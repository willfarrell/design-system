<script>
import { page } from "$app/state";
import Time from "../elements/time.svelte";

const { datetime, value, ...props } = $props();

const dateValue = $derived(datetime ?? value);

const locale = $derived.by(() => {
	try {
		return page.locale;
	} catch {
		return undefined;
	}
});

const getLocalizedDate = (value, locale, options = {}) => {
	if (!value) return value;
	const format = { ...options };
	format.dateStyle ??= "long";
	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) format.timeZone ??= "UTC";
	return new Intl.DateTimeFormat(locale, format).format(new Date(value));
};
</script>

{#if true}
  {@const label = getLocalizedDate(dateValue, locale ?? "en-CA", props)}
  <Time datetime={dateValue} {...props}>{label}</Time>
{/if}
