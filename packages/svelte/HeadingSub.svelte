<script>
  import P from './element/p.svelte'
</script>

<P {...$$props} aria-roledescription="subtitle">
  <slot />
</P>
