<script>
  import FieldLabel from "./FieldLabel.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  import Input from './element/input.svelte';
  export let id, label, hint, error;
</script>

<div>
  <Input {...$$props} />
  <FieldLabel {id} {label} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
    <!-- conditional -->
  <!-- <slot /> -->
</div>
