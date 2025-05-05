<script>
  import Label from "./element/label.svelte";
  let { ...props } = $props();
  let { id, label } = props;
</script>

<Label for={id} class={props.class}>{label}</Label>
