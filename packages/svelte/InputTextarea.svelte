<script>
  import Div from "./element/div.svelte";
  import FieldLabel from "./FieldLabel.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  import Textarea from "./element/textarea.svelte";
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
    value={null}
    {name}
    {...props}
    aria-describedby={ariaDescribedby}
    aria-invalid={ariaInvalid}
  />
</Div>
