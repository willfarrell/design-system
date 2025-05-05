<script>
  import allowedAttributes from "../utils/attributes.js";
  const elementAttributes = new Set([
    "autocomplete",
    "disabled",
    "form",
    "multiple",
    "name",
    "required",
    "size",
  ]);

  let { children, ...props } = $props();
</script>

<select {...allowedAttributes(props, elementAttributes)}>
  <!-- <button><selectedoption></selectedoption></button> -->
  {@render children?.()}
</select>
<!--
  TODO move logic up a level
<script>
  import attributes from '../utils/attributes.js'
  let { children, ...props } = $props();
  let {
    id,
    name = props.id,
    hint,
    error,
    value,
  } = props

  // aria-describedby={hint ? id+'-hint' : null}
  // aria-errormessage={error?.length ? id + "-error" : null} // for aria-live only?
  let describedby = ''
  if (hint) describedby += id+'-hint'
  if (error?.length) describedby+=id+'-error'
  describedby||=null
</script>


<select
  {...attributes(props, {multiple:true})}
  {id}
  {name}
  {value}
  aria-describedby={describedby}
  aria-invalid={error?.length ? 'true' : null}
  class={props.class}
>
  <button><selectedoption></selectedoption></button>
  {@render children?.()}
</select>
-->
