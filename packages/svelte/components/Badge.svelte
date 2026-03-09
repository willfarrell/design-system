<script>
import Span from "../elements/span.svelte";

let { children, ...props } = $props();
</script>

<Span class="badge" {...props}>
  {@render children?.()}
</Span>
