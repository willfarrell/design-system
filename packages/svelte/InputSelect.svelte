<script>
  import FieldLabel from "./FieldLabel.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  import Select from "./element/Select.svelte";

  export let id, label, hint, error
</script>

<div>
  <FieldLabel {id} {label} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <Select {...$$props}>
    <slot />
  </Select>
</div>
