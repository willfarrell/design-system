<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'accept','alt','autocomplete','capture','checked','dirname','disabled','form','formaction','formenctype','formmethod','formnovalidate','formtarget','height','list','max','maxlength','min','minlength','multiple','name','pattern','placeholder','popovertarget','popovertargetaction','readonly','required','size','src','step','type','value','width'
  ])
  
  let {
    ...props
  } = $props();
  
  // TODO move below logic up a level
</script>
<input dir="auto" value="" {...allowedAttributes(props, elementAttributes)}/>
<!-- <script>
  import dataAttributes from "../utils/dataAttributes.js";
  let { ...props } = $props();
  let {
    is, id, name, type, hint, error, 
    value = '', 
    step, size, checked, list,
    autocomplete , autocapitalize , autocorrect , spellcheck,
    enterkeyhint, inputmode, pattern,
    accept, capture, multiple
  } = props
   
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes
//   const attributes = []
//   
//   let describedby = ''
//   if (hint) describedby += (id ?? name) + '-hint'
//   if (error?.length) describedby += (id ?? name) + '-error'
//   describedby ||= null
// </script>-->


<!-- <slot name="prefix" aria-hidden="true"/> -->
<!-- TODO Report aria-invalid="true" marked at invalid by lighthouse - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid -->
<!-- <input
  {is}
  {...dataAttributes(props)}
  id={id ?? name}
  name={name ?? id}
  {type}
  dir="auto"
  class={props.class}
  {value}
  {step}
  {size}
  {checked}
  {list}
  
  {autocomplete}
  {autocapitalize}
  {autocorrect}
  {enterkeyhint}
  {inputmode}
  {pattern}
  {spellcheck}
  
  {accept}
  {capture}
  {multiple}
  
  aria-describedby={describedby}
  
  aria-invalid={error?.length ? 'true' : null}
/> -->
<!-- button (password show, passcode resend) TODO inline -->

