<script>
  export let autocomplete , autocapitalize , autocorrect, spellcheck
  export let id, name, hint, error, value;
</script>


<textarea
  rows="5"
  {autocomplete}
  {autocapitalize}
  {autocorrect}
  {spellcheck}
  {...$$props}
  {id}
  name={name ?? id}
  dir="auto"
  aria-describedby={hint ? id + "-hint" : null}
  aria-errormessage={error?.length ? id + "-error" : null}
  aria-invalid={error?.length ? 'true' : null}
>{value ?? ""}</textarea>

