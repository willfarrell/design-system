<script>
  export let autocomplete , autocapitalize , autocorrect, spellcheck
  export let id, name, hint, error, value;
  
  // aria-describedby={hint ? id+'-hint' : null}
  // aria-errormessage={error?.length ? id + "-error" : null} // for aria-live only?
  let describedby = ''
  if (hint) describedby+=id+'-hint'
  if (error?.length) describedby+=id+'-error'
  describedby||=null
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
  aria-describedby={describedby}
  aria-invalid={error?.length ? 'true' : null}
>{value ?? ""}</textarea>

