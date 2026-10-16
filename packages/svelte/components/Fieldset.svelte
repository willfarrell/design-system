<script>
import { setContext } from "svelte";
import Fieldset from "../elements/fieldset.svelte";
import fieldAria from "../utils/fieldAria.js";
import FieldError from "./FieldError.svelte";
import FieldHint from "./FieldHint.svelte";
import FieldLegend from "./FieldLegend.svelte";

const {
	children,
	id,
	name,
	legend,
	legendSnippet,
	hint,
	error,
	value,
	"aria-describedby": describedby,
	...props
} = $props();
const resolvedName = $derived(name ?? id);
const resolvedLegend = $derived(legend ?? props.label);
const aria = $derived(fieldAria(id, hint, error, describedby));
setContext("fieldset", {
	get name() {
		return resolvedName;
	},
	get value() {
		return value;
	},
});
</script>

<Fieldset
  name={resolvedName}
  {...props}
  {id}
  tabindex="-1"
  {...aria}
>
  <FieldLegend legend={resolvedLegend} children={legendSnippet} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  {@render children?.()}
</Fieldset>
