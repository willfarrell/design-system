<script>
  import allowedAttributes from "../utils/attributes.js";
  const elementAttributes = new Set([
    "autocomplete",
    "cols",
    "dirname",
    "disabled",
    "form",
    "maxlength",
    "minlength",
    "name",
    "placeholder",
    "readonly",
    "required",
    "rows",
    "wrap",
  ]);

  let {
    // children, // {@render ...} tag cannot be inside <textarea>
    ...props
  } = $props();
</script>

<textarea {...allowedAttributes(props, elementAttributes)}
  >{props.value}</textarea
>
<!--
  TODO move logic up
<script>
  let {
    ...props
  } = $props();

  // aria-describedby={hint ? id+'-hint' : null}
  // aria-errormessage={error?.length ? id + "-error" : null} // for aria-live only?
  let describedby = $state('')
  if (props.hint) describedby+=props.id+'-hint'
  if (props.error?.length) describedby+=props.id+'-error'
  describedby||=null
</script>


<textarea
  rows="5"
  {props.autocomplete}
  {props.autocapitalize}
  {props.autocorrect}
  {props.spellcheck}
  {...props}
  {props.id}
  name={props.name ?? props.id}
  dir="auto"
  aria-describedby={describedby}
  aria-invalid={props.error?.length ? 'true' : null}
>{props.value ?? ""}</textarea>

-->
