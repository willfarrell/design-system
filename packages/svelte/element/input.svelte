<script>
  import dataAttributes from "../utils/dataAttributes.js";
  export let is, id, name, type, hint, error, value = '', step, size, checked, list;
  export let autocomplete , autocapitalize , autocorrect , spellcheck
  export let enterkeyhint, inputmode, pattern
  export let accept, capture, multiple
  
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes
  const attributes = ['accept','alt','autocomplete','capture','checked','dirname','disabled','form','formaction','formenctype','formmethod','formnovalidate','formtarget','height','list','max','maxlength','min','minlength','multiple','name','pattern','placeholder','popovertarget','popovertargetaction','readonly','required','size','src','step','type','value','width']
  //console.log($$props)
  
  // aria-describedby={hint ? (id ?? name)+'-hint' : null}
  // aria-errormessage={error?.length ? (id ?? name) + "-error" : null} // for aria-live only?
  let describedby = ''
  if (hint) describedby+=(id ?? name)+'-hint'
  if (error?.length) describedby+=(id ?? name)+'-error'
  describedby||=null
</script>


<!-- <slot name="prefix" aria-hidden="true"/> -->
<!-- TODO Report aria-invalid="true" marked at invalid by lighthouse - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid -->
<input
  {is} {...dataAttributes($$props)}
  id={id ?? name}
  name={name ?? id}
  {type}
  dir="auto"
  class={$$props.class}
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
/>
<!-- button (password show, passcode resend) TODO inline -->
<!-- <slot name="suffix" aria-hidden="true"/> -->

