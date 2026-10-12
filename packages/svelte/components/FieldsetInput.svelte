<script>
import Div from "../elements/div.svelte";
import Input from "../elements/input.svelte";
import fieldAria from "../utils/fieldAria.js";
import FieldError from "./FieldError.svelte";
import FieldHint from "./FieldHint.svelte";
import FieldLabel from "./FieldLabel.svelte";

const {
	id,
	label,
	hint,
	error,
	"aria-describedby": describedby,
	...props
} = $props();
const aria = $derived(fieldAria(id, hint, error, describedby));
</script>

<Div>
  <Input {id} {...props} {...aria} />
  <FieldLabel {id} {label} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
</Div>
