<script>
import Data from "../elements/data.svelte";

const { value, enums, ...props } = $props();

const label = $derived(enums[value]);
</script>

<Data {value} {...props}>{label}</Data>
