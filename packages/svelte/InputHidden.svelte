<script>
import Input from "./element/input.svelte";

const { ...props } = $props();
</script>

<Input {...props} type="hidden" />
