<script>
  import attributes from '../utils/attributes.js'
  export let id, name, hint, error, value
</script>


<select
  {...attributes($$props)}
  {id}
  name={name ?? id}
  {value}
  aria-describedby={hint ? id + '-hint' : null}
  aria-errormessage={error?.length ? id + '-error' : null}
  aria-invalid={error?.length ? 'true' : null}
  class={$$props.class}
>
  <slot />
</select>
