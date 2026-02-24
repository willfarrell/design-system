<script>
import Div from "./element/div.svelte";
import Input from "./element/input.svelte";
import FieldError from "./FieldError.svelte";
import FieldHint from "./FieldHint.svelte";
import FieldLabel from "./FieldLabel.svelte";

const { ...props } = $props();
const { id, label, hint, error } = props;
</script>

<Div>
  <Input {...props} />
  <FieldLabel {id} {label} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <!-- conditional -->
  <!-- {@render children?.()} -->
</Div>
