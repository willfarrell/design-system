<script>
  import { setContext } from "svelte";
  import allowedAttributes from "../utils/attributes.js";
  const elementAttributes = new Set(["disabled", "form", "name"]);

  let { children, ...props } = $props();

  props.name ??= props.id;
  if (props.hint) {
    props["aria-describedby"] ??= props.id + "-hint";
  }
  setContext("fieldset", { name: props.name, value: props.value });
  // TODO test
</script>

<fieldset {...allowedAttributes(props, elementAttributes)}>
  {@render children?.({ id: props.id, value: props.value })}
</fieldset>
