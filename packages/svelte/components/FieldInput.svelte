<script>
import Div from "../elements/div.svelte";
import Input from "../elements/input.svelte";
import fieldAria from "../utils/fieldAria.js";
import FieldError from "./FieldError.svelte";
import FieldHint from "./FieldHint.svelte";
import FieldLabel from "./FieldLabel.svelte";

const {
	children,
	id,
	name,
	label,
	labelSnippet,
	hint,
	error,
	"aria-describedby": describedby,
	...props
} = $props();
const resolvedName = $derived(name ?? id);

const aria = $derived(fieldAria(id, hint, error, describedby));
</script>

<Div>
  <FieldLabel {id} {label} children={labelSnippet} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <Input {id} name={resolvedName} {...props} {...aria} />
  {@render children?.()}
</Div>
