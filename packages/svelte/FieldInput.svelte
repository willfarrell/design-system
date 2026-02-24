<script>
import Div from "./element/div.svelte";
import Input from "./element/input.svelte";
import FieldError from "./FieldError.svelte";
import FieldHint from "./FieldHint.svelte";
import FieldLabel from "./FieldLabel.svelte";

const { children, ...props } = $props();
const { id, name = props.id, label, labelSnippet, hint, error } = props;
</script>

<Div>
  <FieldLabel {id} {label} children={labelSnippet} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <Input {name} {...props} />
  <!-- for datalist support -->
  {@render children?.()}
</Div>
