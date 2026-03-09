<script>
import Div from "../elements/div.svelte";
import Textarea from "../elements/textarea.svelte";
import FieldError from "./FieldError.svelte";
import FieldHint from "./FieldHint.svelte";
import FieldLabel from "./FieldLabel.svelte";

const { id, name, label, labelSnippet, hint, error, ...props } = $props();
const resolvedName = $derived(name ?? id);

// aria-describedby={hint ? id+'-hint' : null}
// aria-errormessage={error?.length ? id + "-error" : null} // for aria-live only?
const ariaDescribedby = $derived.by(() => {
	const parts = [];
	if (hint) parts.push(`${id}-hint`);
	if (error?.length) parts.push(`${id}-error`);
	return parts.join(" ") || null;
});
const ariaInvalid = $derived(error?.length ? "true" : null);
// TODO add in spellcheck?
</script>

<Div>
  <FieldLabel {id} {label} children={labelSnippet} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <Textarea
    {id}
    dir="auto"
    value={null}
    name={resolvedName}
    {...props}
    aria-describedby={ariaDescribedby}
    aria-invalid={ariaInvalid}
  />
</Div>
