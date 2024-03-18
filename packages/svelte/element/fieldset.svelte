<script>
  import { setContext } from "svelte";
  export let is, id, role, name, hint, value;

  setContext("fieldset", { name: name ?? id, value });
</script>

<fieldset
  {is}
  {id}
  aria-describedby={hint ? id + "-hint" : null}
  {role}
  class={$$props.class}
>
  <slot {id} {value} />
</fieldset>
