<script>
  import Div from './element/div.svelte';
  import FieldLabel from "./FieldLabel.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  import Textarea from "./element/textarea.svelte";
  export let id, name, label, hint, error, value;
  
  const props = $$props
  delete props.label
  delete props.hint
  delete props.error
</script>

<Div>
  <FieldLabel {id} {label} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <Textarea
    {...props}
    {id}
    name={name ?? id}
    value={value ?? null}
    aria-describedby={hint ? id + "-hint" : null}
    aria-errormessage={error?.length ? id + "-error" : null}
    aria-invalid={error?.length ? 'true' : null}
  />
</Div>