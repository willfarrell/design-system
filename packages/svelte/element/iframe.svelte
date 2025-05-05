<script>
  import allowedAttributes from "../utils/attributes.js";
  const elementAttributes = new Set([
    "allow",
    "allowfullscreen",
    "height",
    "loading",
    "name",
    "referrerpolicy",
    "sandbox",
    "src",
    "srcdoc",
    "width",
  ]);

  let { ...props } = $props();
  // TODO add in sandbox default
</script>

<iframe loading="lazy" title="" {...allowedAttributes(props, elementAttributes)}
></iframe>
