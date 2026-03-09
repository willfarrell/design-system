<script>
import Div from "../elements/div.svelte";
import Input from "../elements/input.svelte";
import FieldError from "./FieldError.svelte";
import FieldHint from "./FieldHint.svelte";
import FieldLabel from "./FieldLabel.svelte";

const { id, label, hint, error, ...props } = $props();
</script>

<Div>
  <Input {id} {...props} />
  <FieldLabel {id} {label} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <!-- conditional -->
  <!-- {@render children?.()} -->
</Div>
