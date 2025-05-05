<script>
  import P from './element/p.svelte'
  let { children, ...props } = $props();
</script>

<P {...props} aria-roledescription="subtitle">
  {@render children?.()}
</P>
