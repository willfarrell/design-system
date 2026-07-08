<script>
import Div from "../elements/div.svelte";
import Input from "../elements/input.svelte";
import FieldError from "./FieldError.svelte";
import FieldHint from "./FieldHint.svelte";
import FieldLabel from "./FieldLabel.svelte";

const { children, id, name, label, labelSnippet, hint, error, ...props } =
	$props();
const resolvedName = $derived(name ?? id);

const errors = $derived(error?.filter((v) => v.id === id));
const describedby = $derived(
	[hint ? `${id}-hint` : null, errors?.length ? `${id}-error` : null]
		.filter(Boolean)
		.join(" ") || undefined,
);
const ariaInvalid = $derived(errors?.length ? "true" : undefined);
</script>

<Div>
  <FieldLabel {id} {label} children={labelSnippet} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <Input {id} name={resolvedName} {...props} aria-describedby={describedby} aria-invalid={ariaInvalid} />
  <!-- for datalist support -->
  {@render children?.()}
</Div>
