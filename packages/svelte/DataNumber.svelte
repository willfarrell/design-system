<script>
import Data from "@design-system/svelte/element/data.svelte";
import { page } from "$app/state";

const { value, ...props } = $props();

const getLocalizedNumber = (value, locale, options = {}) => {
	if (typeof value === "string") value = Number.parseFloat(value);
	return new Intl.NumberFormat(locale, options).format(value);
};

const label = getLocalizedNumber(value, page.locale, props);
</script>

<Data {value} {...props}>{label}</Data>
