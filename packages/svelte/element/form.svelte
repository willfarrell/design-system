<script>
  import { setContext } from "svelte";
  import dataAttributes from "../utils/dataAttributes.js";

  export let method = "GET";
  export let action = null;
  export let is, role;
  export let errors;

  setContext("form", { errors });

  if (action && action?.substring(0, 1) !== "/") {
    action = `?/${action}`;
  }
</script>

<form {method} {action} novalidate {is} {role} {...dataAttributes($$props)}>
  <slot />
</form>
