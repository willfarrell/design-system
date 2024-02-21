<script>
  import FieldLabel from "./FieldLabel.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  import Textarea from "./element/textarea.svelte";
  export let id, name, label, hint, error, value;
</script>

<div>
  <FieldLabel {id} {label} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <Textarea
    {...$$props}
    {id}
    name={name ?? id}
    value={value ?? ""}
    aria-describedby={hint ? id + "-hint" : null}
    aria-errormessage={error?.length ? id + "-error" : null}
    aria-invalid={error?.length ? 'true' : null}
  />
</div>