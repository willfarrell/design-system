<script>
import Fieldset from "./Fieldset.svelte";
import InputHidden from "./InputHidden.svelte";

const { ...props } = $props();
const { id = "javascript-enabled" } = props;
let {
	is = `ds-input-${id}`,
	name = id,
	label,
	hint,
	value = false,
	error,
} = props;

error = error?.filter((v) => v.id === id);
</script>

<!-- {#if error?.length}
  <Fieldset {id} {label} {hint} {error}>
    <InputHidden {name} {value} />
  </Fieldset>
{:else}
  <Fieldset {id} {is}>
    <InputHidden {name} {value} />
  </Fieldset>
{/if} -->
<InputHidden {is} {name} {value} />
