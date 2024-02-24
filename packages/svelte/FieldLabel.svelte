<script>
  import Label from "./element/label.svelte";
  export let id, label;
</script>

<Label for={id} class="{$$props.class}">{label}</Label>
