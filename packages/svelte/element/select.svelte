<script>
  import attributes from '../utils/attributes.js'
  export let id, name, hint, error, value
  
  // aria-describedby={hint ? id+'-hint' : null}
  // aria-errormessage={error?.length ? id + "-error" : null} // for aria-live only?
  let describedby = ''
  if (hint) describedby+=id+'-hint'
  if (error?.length) describedby+=id+'-error'
  describedby||=null
</script>


<select
  {...attributes($$props, {multiple:true})}
  {id}
  name={name ?? id}
  {value}
  aria-describedby={describedby}
  aria-invalid={error?.length ? 'true' : null}
  class={$$props.class}
>
  <slot />
</select>
