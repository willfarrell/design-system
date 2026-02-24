<script>
import Data from "@design-system/svelte/element/data.svelte";

const { value, enums, ...props } = $props();

const label = enums[value];
</script>

<Data {value} {...props}>{label}</Data>
