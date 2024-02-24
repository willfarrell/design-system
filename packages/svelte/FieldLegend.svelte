<script>
  import Legend from "./element/legend.svelte";
  export let legend
</script>

{#if legend}
  <Legend class="{$$props.class}">
   {legend}
  </Legend>
{/if}

