<script>
import { page } from "$app/state";
import Time from "../elements/time.svelte";

const { datetime, value, ...props } = $props();

const dateValue = $derived(datetime ?? value);

const locale = $derived.by(() => {
	try { return page.locale; } catch { return undefined; }
});

const getLocalizedDate = (value, locale, options = {}) => {
	if (!value) return value;
	options.dateStyle ??= "long";
	return new Intl.DateTimeFormat(locale, options).format(new Date(value));
};
</script>

{#if true}
  {@const label = getLocalizedDate(dateValue, locale ?? "en-CA", props)}
  <Time datetime={dateValue} {...props}>{label}</Time>
{/if}
