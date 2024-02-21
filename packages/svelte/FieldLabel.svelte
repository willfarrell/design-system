<script>
  import Label from "./element/label.svelte";
  export let id, label;
</script>

<Label {id} {label} class="{$$props.class}" />
