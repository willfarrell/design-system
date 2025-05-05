<script>
  import Div from './element/div.svelte';
  import FieldLabel from "./FieldLabel.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  import Textarea from "./element/textarea.svelte";
  let { ...props } = $props();
  let { 
    id, 
    name, 
    label, 
    hint, 
    error, 
    value 
  } = props
  
  delete props.label
  delete props.hint
  delete props.error
  // aria-describedby={hint ? id+'-hint' : null}
  // aria-errormessage={error?.length ? id + "-error" : null} // for aria-live only?
  let describedby = ''
  if (hint) describedby+=id+'-hint'
  if (error?.length) describedby+=id+'-error'
  describedby||=null
  // TODO add in spellcheck?
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
    aria-describedby={describedby}
    aria-invalid={error?.length ? 'true' : null}
  />
</Div>