<script>
  import A from "@design-system/svelte/element/a.svelte";
  const { children, ...props } = $props();
  const { id } = props;
</script>

<A
  aria-describedby="footnote-label"
  href="#footnote-{id}"
  id="footnote-{id}-ref"
>
  {@render children?.()}
</A>
