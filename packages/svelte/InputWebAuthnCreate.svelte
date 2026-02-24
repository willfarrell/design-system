<script>
import InputHidden from "./InputHidden.svelte";

const { ...props } = $props();
// data-options required
</script>

<InputHidden {...props} autocomplete="webauthn" />
