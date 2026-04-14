<script>
import { page } from "$app/state";
import Data from "../elements/data.svelte";

const { value, ...props } = $props();

const getLocalizedBytes = (value, locale, decimals = 2) => {
	if (value === 0) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	const i = Math.floor(Math.log(value) / Math.log(k));
	return (
		new Intl.NumberFormat(locale).format(
			Number.parseFloat((value / k ** i).toFixed(dm)),
		) +
		" " +
		sizes[i]
	);
};

const locale = $derived.by(() => {
	try {
		return page.locale;
	} catch {
		return undefined;
	}
});
const label = $derived(getLocalizedBytes(value, locale ?? "en-CA", props));
</script>

<Data {value} {...props}>{label}</Data>
