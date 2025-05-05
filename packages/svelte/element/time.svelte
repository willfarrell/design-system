<script>
  import allowedAttributes from "../utils/attributes.js";
  const elementAttributes = new Set(["datetime"]);

  let { children, ...props } = $props();
</script>

<time {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</time>
