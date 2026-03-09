<script>
import Input from "../elements/input.svelte";

const { ...props } = $props();
</script>

<Input {...props} type="hidden" />
