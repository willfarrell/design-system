<script>
import { page } from "$app/state";
import Time from "../elements/time.svelte";

const { datetime, value, ...props } = $props();

const dateValue = $derived(datetime ?? value);

const locale = $derived.by(() => {
	try {
		return page.data?.locale;
	} catch {
		return undefined;
	}
});

const componentOptions = [
	"weekday",
	"era",
	"year",
	"month",
	"day",
	"dayPeriod",
	"hour",
	"minute",
	"second",
	"fractionalSecondDigits",
	"timeZoneName",
];

const getLocalizedDate = (value, locale, options = {}) => {
	if (!value) return value;
	const format = { ...options };
	if (!componentOptions.some((option) => option in format)) {
		format.dateStyle ??= "long";
	}
	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) format.timeZone ??= "UTC";
	return new Intl.DateTimeFormat(locale, format).format(new Date(value));
};

const label = $derived(getLocalizedDate(dateValue, locale ?? "en-CA", props));
</script>

<Time datetime={dateValue} {...props}>{label}</Time>
