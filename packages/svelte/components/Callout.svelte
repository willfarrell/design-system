<script>
import Aside from "../elements/aside.svelte";
import H3 from "../elements/h3.svelte";
import slugify from "../utils/slugify.js";

const { children, id, label, ...props } = $props();
const uid = $props.id();

const labelledby = $derived(`callout-${id ? slugify(id) : uid}`);
</script>

<Aside aria-labelledby={labelledby} {...props}>
  <H3 id={labelledby}>{label}</H3>
  {@render children?.({ id: labelledby })}
</Aside>
