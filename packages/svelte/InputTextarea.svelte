<script>
import Div from "./element/div.svelte";
import Textarea from "./element/textarea.svelte";
import FieldError from "./FieldError.svelte";
import FieldHint from "./FieldHint.svelte";
import FieldLabel from "./FieldLabel.svelte";

const { ...props } = $props();
const { id, name = props.id, label, labelSnippet, hint, error } = props;

// aria-describedby={hint ? id+'-hint' : null}
// aria-errormessage={error?.length ? id + "-error" : null} // for aria-live only?
const ariaDescribedbyParts = [];
if (hint) ariaDescribedbyParts.push(`${id}-hint`);
if (error?.length) ariaDescribedbyParts.push(`${id}-error`);
const ariaDescribedby = ariaDescribedbyParts.join(" ") || null;
const ariaInvalid = error?.length ? "true" : null;
// TODO add in spellcheck?
</script>

<Div>
  <FieldLabel {id} {label} children={labelSnippet} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <Textarea
    dir="auto"
    value={null}
    {name}
    {...props}
    aria-describedby={ariaDescribedby}
    aria-invalid={ariaInvalid}
  />
</Div>
