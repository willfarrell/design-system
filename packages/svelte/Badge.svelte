<script>
import Span from "@design-system/svelte/element/span.svelte";

let { children, ...props } = $props();
</script>

<Span class="badge" {...props}>
  {@render children?.()}
</Span>
