<script>
import A from "../elements/a.svelte";

const { children, id, ...props } = $props();
</script>

<A
  aria-describedby="footnote-label"
  href="#footnote-{id}"
  id="footnote-{id}-ref"
>
  {@render children?.()}
</A>
