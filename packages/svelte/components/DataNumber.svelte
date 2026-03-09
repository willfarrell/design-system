<script>
import { page } from "$app/state";
import Data from "../elements/data.svelte";

const { value, ...props } = $props();

const getLocalizedNumber = (value, locale, options = {}) => {
	if (typeof value === "string") value = Number.parseFloat(value);
	return new Intl.NumberFormat(locale, options).format(value);
};

const locale = $derived.by(() => {
	try { return page.locale; } catch { return undefined; }
});
const label = $derived(getLocalizedNumber(value, locale, props));
</script>

<Data {value} {...props}>{label}</Data>
