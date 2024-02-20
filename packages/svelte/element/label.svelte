<script>
  export let id, label;
</script>

{#if label}
  <label for={id} class={$$props.class}>{label}</label>
{/if}
