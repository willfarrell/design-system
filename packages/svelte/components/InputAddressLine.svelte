<script>
import InputText from "./InputText.svelte";

const { children, ...props } = $props();
const {
	autocomplete = "address-line2", // address-line2, address-line3, address-level4
} = props;
</script>

<InputText {...props} {autocomplete}>
  {@render children?.()}
</InputText>
