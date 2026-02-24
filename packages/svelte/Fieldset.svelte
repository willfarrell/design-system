<script>
import { setContext } from "svelte";
import Fieldset from "./element/fieldset.svelte";
import FieldError from "./FieldError.svelte";
import FieldHint from "./FieldHint.svelte";
import FieldLegend from "./FieldLegend.svelte";

const { children, ...props } = $props();
const {
	id,
	name = props.id,
	legend = props.label,
	legendSnippet,
	hint,
	error,
	value,
} = props;
setContext("fieldset", { name, value });
</script>

<Fieldset {name} {...props}>
  <FieldLegend {id} {legend} children={legendSnippet} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  {@render children?.()}
</Fieldset>
