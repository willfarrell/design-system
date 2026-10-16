<script>
import Section from "../elements/section.svelte";
import FieldsetInput from "./FieldsetInput.svelte";

const {
	children,
	label = "Pause animations",
	class: className,
	...props
} = $props();
const toggleId = $derived(`${props.id ?? "pause-animations"}-toggle`);
</script>

<Section {...props} class={["pause-animations", className]}>
  <FieldsetInput id={toggleId} name="pause-animations" type="checkbox" {label} />
  {@render children?.()}
</Section>
