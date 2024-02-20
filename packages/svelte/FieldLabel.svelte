<script>
  import Label from "./element/Label.svelte";
  export let id, label;
</script>

<Label {id} {label} class="{$$props.class}" />
