<script>
import FieldsetInput from "./FieldsetInput.svelte";

const {
	id = "pause-animations",
	label = "Pause animations",
	...props
} = $props();
</script>

<FieldsetInput {...props} {id} {label} type="checkbox" class="pause-animations" />
