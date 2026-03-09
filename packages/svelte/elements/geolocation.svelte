<script>
import allowedAttributes from "../utils/attributes.js";

const elementAttributes = new Set(["accuracymode", "autolocate", "onlocation"]);

const { children, ...props } = $props();
</script>

<geolocation {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</geolocation>
