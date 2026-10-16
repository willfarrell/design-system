<script>
import A from "../elements/a.svelte";

const { children, id, labelId = "footnote-label", ...props } = $props();
</script>

<A
  {...props}
  aria-describedby={labelId}
  href="#footnote-{id}"
  id="footnote-{id}-ref"
>
  {@render children?.()}
</A>
