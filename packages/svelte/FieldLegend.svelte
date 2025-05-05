<script>
  import Legend from "./element/legend.svelte";
  let { ...props } = $props();
  let { legend } = props;
</script>

{#if legend}
  <Legend class={props.class}>
    {legend}
  </Legend>
{/if}
